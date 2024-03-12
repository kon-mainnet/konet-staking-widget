import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

export const DoINeedToClaimMyStakingRewards: FC = () => {
  return (
    <Accordion summary="Do I need to claim my staking rewards if I wrap stKONET to wstKONET?">
      <p>No, staking rewards accrue to wstKONET automatically.</p>
    </Accordion>
  );
};
