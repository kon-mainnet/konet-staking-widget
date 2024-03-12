import { FC } from 'react';
import { Accordion, Link as OuterLink } from '@lidofinance/lido-ui';

import { MATOMO_CLICK_EVENTS_TYPES } from 'config';
import { WRAP_PATH } from 'config/urls';
import { trackMatomoEvent } from 'config/trackMatomoEvent';
import { LocalLink } from 'shared/components/local-link';

export const HowCanIGetWsteth: FC = () => {
  return (
    <Accordion summary="How can I get wstKONET?">
      <p>
        You can wrap your stKONET or KONET tokens using{' '}
        <LocalLink
          href={WRAP_PATH}
          onClick={() =>
            trackMatomoEvent(
              MATOMO_CLICK_EVENTS_TYPES.faqHowCanIGetWstethWrapLink,
            )
          }
          aria-hidden="true"
        >
          Wrap &amp; Unwrap staking widget
        </LocalLink>{' '}
        or{' '}
        <OuterLink
          href={
            'https://konetmain.com/lido-ecosystem?tokens=wstETH&categories=Get'
          }
          data-matomo={MATOMO_CLICK_EVENTS_TYPES.faqHowCanIGetStEthIntegrations}
        >
          DEX KONET integrations
        </OuterLink>
      </p>
    </Accordion>
  );
};
