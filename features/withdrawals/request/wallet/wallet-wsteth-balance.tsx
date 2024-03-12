import { Text } from '@lidofinance/lido-ui';

import { CardBalance } from 'shared/wallet';
import { FormatToken } from 'shared/formatters';
import { useStethByWsteth } from 'shared/hooks';
import { useRequestFormData } from '../request-form-context';

export const WalletWstethBalance = () => {
  const { balanceWSteth, loading } = useRequestFormData();
  const { data: stethByWstethBalance, initialLoading: isStethByWstethLoading } =
    useStethByWsteth(balanceWSteth);

  const stethBalanceValue = (
    <>
      <FormatToken
        data-testid="wstEthBalance"
        amount={balanceWSteth}
        symbol="wstKONET"
      />
      <Text size={'xxs'} color={'secondary'}>
        ≈{' '}
        <FormatToken
          data-testid="wstEthBalanceOption"
          amount={stethByWstethBalance}
          symbol="KONET"
        />
      </Text>
    </>
  );

  return (
    <CardBalance
      small
      title="wstKONET Balance"
      loading={loading.isStethBalanceLoading || isStethByWstethLoading}
      value={stethBalanceValue}
    />
  );
};
