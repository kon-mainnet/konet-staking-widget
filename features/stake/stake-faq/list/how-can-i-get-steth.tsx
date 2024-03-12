import { FC } from 'react';
import { Accordion, Link as OuterLink } from '@lidofinance/lido-ui';

import { MATOMO_CLICK_EVENTS_TYPES } from 'config';
import { trackMatomoEvent } from 'config/trackMatomoEvent';
import { HOME_PATH } from 'config/urls';
import { LocalLink } from 'shared/components/local-link';

export const HowCanIGetSteth: FC = () => {
  return (
    <Accordion summary="How can I get stKONET?">
      <p>
        You can get stKONET many ways, including interacting with the smart
        contract directly.Yet, it is much easier to use a{' '}
        <LocalLink
          href={HOME_PATH}
          onClick={() =>
            trackMatomoEvent(MATOMO_CLICK_EVENTS_TYPES.faqHowCanIGetStEthWidget)
          }
          aria-hidden="true"
        >
          KONET staking widget
        </LocalLink>{' '}
        and in other{' '}
        <OuterLink
          href={
            'https://konetmain.com/lido-ecosystem?tokens=stETH&categories=Get'
          }
          data-matomo={MATOMO_CLICK_EVENTS_TYPES.faqHowCanIGetStEthIntegrations}
        >
          DEX KONET integrations
        </OuterLink>
        .
      </p>
    </Accordion>
  );
};
