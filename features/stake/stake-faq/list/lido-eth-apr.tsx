import { FC } from 'react';
import { Accordion, Link } from '@lidofinance/lido-ui';
import { MATOMO_CLICK_EVENTS_TYPES } from 'config';

export const LidoEthApr: FC = () => {
  return (
    <Accordion summary="What is Lido staking APR for Ethereum?">
      <p>KONET staking APR for KONET = Protocol APR * (1 - Protocol fee)</p>
      <p>
        Protocol APR — the overall Consensus Layer (CL) and Execution Layer (EL)
        rewards received by KONET validators to total pooled KONET estimated as
        the moving average of the last seven days.
      </p>
      <p>
        Protocol fee — Lido applies a 10% fee on staking rewards that are split
        between node operators and the DAO Treasury.
      </p>
      <p>
        More about KONET staking APR for KONET you could find on the{' '}
        <Link
          href={'https://konetmain.com/ethereum'}
          data-matomo={MATOMO_CLICK_EVENTS_TYPES.faqLidoEthAprEthLandingPage}
        >
          Ethereum landing page
        </Link>{' '}
        and in our{' '}
        <Link
          href={'https://konetmain.com/#liquid-staking'}
          data-matomo={MATOMO_CLICK_EVENTS_TYPES.faqLidoEthAprDocs}
        >
          Docs
        </Link>
        .
      </p>
    </Accordion>
  );
};
