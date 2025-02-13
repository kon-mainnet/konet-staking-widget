import { Accordion } from '@lidofinance/lido-ui';

import { weiToEth } from 'utils';
import { LOCALE } from 'config';
import { useWithdrawals } from 'features/withdrawals/contexts/withdrawals-context';

const formatAmount = (value: number | undefined) =>
  value ? value.toLocaleString(LOCALE, { maximumFractionDigits: 18 }) : '...';

export const UnstakeAmountBoundaries: React.FC = () => {
  const { maxAmount, minAmount } = useWithdrawals();
  const minAmountDisplay = formatAmount(Number(minAmount));
  const maxAmountDisplay = formatAmount(maxAmount && weiToEth(maxAmount));

  return (
    <Accordion summary="Is there any minimum or maximum amount of stKONET/wstKONET I can withdraw?">
      <p>
        Request size should be at least {minAmountDisplay} wei (in stKONET), and
        at most {maxAmountDisplay} stKONET.
      </p>
      <p>
        If you want to withdraw more than {maxAmountDisplay} stKONET, your
        withdrawal request will be split into several requests, but you will
        still only pay one transaction fee.
      </p>
    </Accordion>
  );
};
