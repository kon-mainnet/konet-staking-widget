import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

export const DoIGetMyStakingRewards: FC = () => {
  return (
    <Accordion summary="Do I get my staking rewards if I wrap stKONET to wstKONET?">
      <p>
        Yes, wrapped stKONET gets staking rewards at the same rate as regular
        stKONET. When you keep your stKONET in a wrapper you cannot see your
        daily staking rewards. However, when you unwrap your wstKONET your new
        stKONET balance will have increased relative to pre-wrapped amount to
        reflect your received rewards.
      </p>
    </Accordion>
  );
};
