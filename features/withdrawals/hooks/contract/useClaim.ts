import { useCallback } from 'react';
import { BigNumber } from 'ethers';

import { useClaimData } from 'features/withdrawals/contexts/claim-data-context';
import { getErrorMessage, runWithTransactionLogger } from 'utils';

import { useWithdrawalsContract } from './useWithdrawalsContract';
import { RequestStatusClaimable } from 'features/withdrawals/types/request-status';
import invariant from 'tiny-invariant';
import { isContract } from 'utils/isContract';
import { useWeb3 } from 'reef-knot/web3-react';
import { useSDK } from '@lido-sdk/react';
import { useTransactionModal, TX_OPERATION } from 'shared/transaction-modal';

export const useClaim = () => {
  const { account } = useWeb3();
  const { providerWeb3 } = useSDK();
  const { contractWeb3 } = useWithdrawalsContract();
  const { optimisticClaimRequests } = useClaimData();
  const { dispatchModalState } = useTransactionModal();

  return useCallback(
    async (sortedRequests: RequestStatusClaimable[]) => {
      try {
        invariant(contractWeb3, 'must have contract');
        invariant(sortedRequests, 'must have requests');
        invariant(account, 'must have address');
        invariant(providerWeb3, 'must have provider');
        const isMultisig = await isContract(account, contractWeb3.provider);

        const ethToClaim = sortedRequests.reduce(
          (s, r) => s.add(r.claimableEth),
          BigNumber.from(0),
        );

        dispatchModalState({
          type: 'start',
          operation: TX_OPERATION.CONTRACT,
          amount: ethToClaim,
          token: 'ETH',
        });

        const ids = sortedRequests.map((r) => r.id);
        const hints = sortedRequests.map((r) => r.hint);
        const callback = async () => {
          if (isMultisig) {
            const tx = await contractWeb3.populateTransaction.claimWithdrawals(
              ids,
              hints,
            );
            return providerWeb3.getSigner().sendUncheckedTransaction(tx);
          } else {
            const feeData = await contractWeb3.provider.getFeeData();
            const maxFeePerGas = feeData.maxFeePerGas ?? undefined;
            const maxPriorityFeePerGas =
              feeData.maxPriorityFeePerGas ?? undefined;
            const gasLimit = await contractWeb3.estimateGas.claimWithdrawals(
              ids,
              hints,
              {
                maxFeePerGas,
                maxPriorityFeePerGas,
              },
            );
            return contractWeb3.claimWithdrawals(ids, hints, {
              maxFeePerGas,
              maxPriorityFeePerGas,
              gasLimit,
            });
          }
        };

        const transaction = await runWithTransactionLogger(
          'Claim signing',
          callback,
        );

        const isTransaction = typeof transaction !== 'string';

        if (!isMultisig && isTransaction) {
          dispatchModalState({ type: 'block', txHash: transaction.hash });
          await runWithTransactionLogger('Claim block confirmation', async () =>
            transaction.wait(),
          );
          // we only update if we wait for tx
          await optimisticClaimRequests(sortedRequests);
        }

        dispatchModalState({
          type: isMultisig ? 'success_multisig' : 'success',
        });
        return true;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        dispatchModalState({ type: 'error', errorText: errorMessage });
        return false;
      }
    },
    [
      contractWeb3,
      account,
      providerWeb3,
      dispatchModalState,
      optimisticClaimRequests,
    ],
  );
};
