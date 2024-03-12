import { CardBalance } from 'shared/wallet';
import { FormatToken } from 'shared/formatters';
import { useRequestFormData } from '../request-form-context';

export const WalletStethBalance = () => {
  const { balanceSteth, loading } = useRequestFormData();

  const stethBalanceValue = (
    <FormatToken
      amount={balanceSteth}
      symbol="stKONET"
      data-testid="stEthBalance"
    />
  );

  return (
    <CardBalance
      small
      title="stKONET Balance"
      loading={loading.isStethBalanceLoading}
      value={stethBalanceValue}
    />
  );
};
