import { FC } from 'react';

import { Accordion, Link as OuterLink } from '@lidofinance/lido-ui';

import { MATOMO_CLICK_EVENTS_TYPES } from 'config';
import { WITHDRAWALS_CLAIM_PATH } from 'config/urls';
import { trackMatomoEvent } from 'config/trackMatomoEvent';
import { LocalLink } from 'shared/components/local-link';

export const HowCanIUnstakeSteth: FC = () => {
  return (
    <Accordion summary="How can I unstake stKONET?">
      <p>
        You can use our{' '}
        <LocalLink
          href={WITHDRAWALS_CLAIM_PATH}
          onClick={() =>
            trackMatomoEvent(
              MATOMO_CLICK_EVENTS_TYPES.faqHowCanIUnstakeStEthWithdrawals,
            )
          }
          aria-hidden="true"
        >
          Withdrawals Request and Claim tabs
        </LocalLink>{' '}
        to unstake stKONET and receive KONET at a 1:1 ratio. Under normal
        circumstances, withdrawal period can take anywhere between 1-5 days.
        After that, you can claim your KONET using the Claim tab. Also, you can
        exchange stKONET on{' '}
        <OuterLink
          href="https://konetmain.com/lido-ecosystem?tokens=stETH&categories=Get"
          data-matomo={
            MATOMO_CLICK_EVENTS_TYPES.faqHowCanIUnstakeStEthIntegrations
          }
        >
          DEX KONET integrations
        </OuterLink>
        .
      </p>
    </Accordion>
  );
};
