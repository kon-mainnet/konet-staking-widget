import {
  TransactionModalTransitStage,
  useTransactionModalStage,
} from 'shared/transaction-modal/hooks/use-transaction-modal-stage';
import { getGeneralTransactionModalStages } from 'shared/transaction-modal/hooks/get-general-transaction-modal-stages';

import { TxStageSignOperationAmount } from 'shared/transaction-modal/tx-stages-composed/tx-stage-amount-operation';
import { TxStageSuccess } from 'shared/transaction-modal/tx-stages-basic';
import { TxAmount } from 'shared/transaction-modal/tx-stages-parts/tx-amount';

import type { BigNumber } from 'ethers';
import {
  trackMatomoEvent,
  MATOMO_CLICK_EVENTS_TYPES,
} from 'config/trackMatomoEvent';

const STAGE_OPERATION_ARGS = {
  token: 'KONET',
  operationText: 'Claiming',
};

const getTxModalStagesClaim = (transitStage: TransactionModalTransitStage) => ({
  ...getGeneralTransactionModalStages(transitStage),

  sign: (amount: BigNumber) =>
    transitStage(
      <TxStageSignOperationAmount {...STAGE_OPERATION_ARGS} amount={amount} />,
    ),

  pending: (amount: BigNumber, txHash?: string) =>
    transitStage(
      <TxStageSignOperationAmount
        {...STAGE_OPERATION_ARGS}
        amount={amount}
        txHash={txHash}
        isPending
      />,
    ),

  success: (amount: BigNumber, txHash?: string) =>
    transitStage(
      <TxStageSuccess
        txHash={txHash}
        title={
          <>
            <TxAmount amount={amount} symbol="KONET" /> has been claimed
          </>
        }
        description="Claiming operation was successful"
        onClickEtherscan={() =>
          trackMatomoEvent(
            MATOMO_CLICK_EVENTS_TYPES.claimViewOnEtherscanSuccessTemplate,
          )
        }
      />,
      {
        isClosableOnLedger: true,
      },
    ),
});

export const useTxModalStagesClaim = () => {
  return useTransactionModalStage(getTxModalStagesClaim);
};
