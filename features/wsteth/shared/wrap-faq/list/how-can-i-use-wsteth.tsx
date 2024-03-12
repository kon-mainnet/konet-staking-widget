import { FC } from 'react';
import { Accordion, Link } from '@lidofinance/lido-ui';
import { MATOMO_CLICK_EVENTS_TYPES } from '../../../../../config';

export const HowCanIUseWsteth: FC = () => {
  return (
    <Accordion summary="How can I use wstKONET?">
      <p>
        wstKONET is useful across{' '}
        <Link
          href={
            'https://konetmain.com/lido-ecosystem?networks=arbitrum%2Coptimism'
          }
          data-matomo={MATOMO_CLICK_EVENTS_TYPES.faqHowCanIUseWstethL2}
        >
          L2
        </Link>{' '}
        and other{' '}
        <Link
          href={'https://konetmain.com/lido-ecosystem?tokens=wstETH'}
          data-matomo={
            MATOMO_CLICK_EVENTS_TYPES.faqHowCanIUseWstethDefiProtocols
          }
        >
          DeFi protocols
        </Link>
        , which are based on constant balance tokens.
      </p>
    </Accordion>
  );
};
