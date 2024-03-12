import { parseEther } from '@ethersproject/units';
import { DataTable, DataTableRow } from '@lidofinance/lido-ui';
import { useFormContext } from 'react-hook-form';

import { FormatPrice, FormatToken } from 'shared/formatters';
import { useTxCostInUsd, useWstethBySteth } from 'shared/hooks';

import { TOKENS_TO_WRAP } from 'features/wsteth/shared/types';

import { useApproveGasLimit } from '../hooks/use-approve-gas-limit';
import { useWrapFormData, WrapFormInputType } from '../wrap-form-context';
import { useWeb3 } from 'reef-knot/web3-react';
import { AllowanceDataTableRow } from 'shared/components/allowance-data-table-row';
import { TOKENS } from '@lido-sdk/constants';
import { DATA_UNAVAILABLE } from 'config';
import { useDebouncedWstethBySteth } from 'features/wsteth/shared/hooks/use-debounced-wsteth-steth';

const oneSteth = parseEther('1');

export const WrapFormStats = () => {
  const { active } = useWeb3();
  const { allowance, wrapGasLimit, isApprovalLoading } = useWrapFormData();

  const { watch } = useFormContext<WrapFormInputType>();
  const [token, amount] = watch(['token', 'amount']);

  const isSteth = token === TOKENS_TO_WRAP.STETH;

  const {
    data: willReceiveWsteth,
    initialLoading: isWillReceiveWstethLoading,
  } = useDebouncedWstethBySteth(amount);

  const {
    data: oneWstethConverted,
    initialLoading: isOneWstethConvertedLoading,
  } = useWstethBySteth(oneSteth);

  const approveGasLimit = useApproveGasLimit();
  const {
    txCostUsd: approveTxCostInUsd,
    initialLoading: isApproveCostLoading,
  } = useTxCostInUsd(approveGasLimit);

  const { txCostUsd: wrapTxCostInUsd, initialLoading: isWrapCostLoading } =
    useTxCostInUsd(wrapGasLimit);

  return (
    <DataTable data-testid="wrapStats">
      <DataTableRow
        title="Max unlock cost"
        data-testid="maxUnlockFee"
        loading={isApproveCostLoading}
      >
        <FormatPrice amount={approveTxCostInUsd} />
      </DataTableRow>
      <DataTableRow
        title="Max transaction cost"
        data-testid="maxGasFee"
        loading={isWrapCostLoading}
      >
        <FormatPrice amount={wrapTxCostInUsd} />
      </DataTableRow>
      <DataTableRow
        title="Exchange rate"
        data-testid="exchangeRate"
        loading={isOneWstethConvertedLoading}
      >
        {oneWstethConverted ? (
          <>
            1 {isSteth ? 'stKONET' : 'KONET'} ={' '}
            <FormatToken
              data-testid="rate"
              amount={oneWstethConverted}
              symbol="wstKONET"
            />{' '}
          </>
        ) : (
          DATA_UNAVAILABLE
        )}
      </DataTableRow>
      <AllowanceDataTableRow
        data-testid="allowance"
        allowance={allowance}
        isBlank={!(isSteth && active)}
        loading={isApprovalLoading}
        token={TOKENS.STETH}
      />

      <DataTableRow
        title="You will receive"
        loading={isWillReceiveWstethLoading}
      >
        <FormatToken
          amount={willReceiveWsteth}
          data-testid="youWillReceive"
          fallback="-"
          symbol="wstKONET"
          trimEllipsis
        />
      </DataTableRow>
    </DataTable>
  );
};
