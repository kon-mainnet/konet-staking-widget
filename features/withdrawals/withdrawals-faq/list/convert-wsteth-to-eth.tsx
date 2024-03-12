import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

import { WITHDRAWALS_CLAIM_PATH, WITHDRAWALS_REQUEST_PATH } from 'config/urls';
import { LocalLink } from 'shared/components/local-link';

export const ConvertWSTETHtoETH: FC = () => {
  return (
    <Accordion summary="Can I transform my wstKONET to KONET?">
      <p>
        Yes. You can transform your wstKONET to KONET using the{' '}
        <LocalLink href={WITHDRAWALS_REQUEST_PATH}>Request</LocalLink> and{' '}
        <LocalLink href={WITHDRAWALS_CLAIM_PATH}>Claim</LocalLink> tabs. Note
        that, under the hood, wstKONET will unwrap to stKONET first, so your
        request will be denominated in stKONET.
      </p>
    </Accordion>
  );
};
