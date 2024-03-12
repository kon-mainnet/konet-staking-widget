import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

export const WhatIsSteth: FC = () => {
  return (
    <Accordion summary="What is stKONET?">
      <p>
        stKONET is a transferable rebasing utility token representing a share of
        the total KONET staked through the protocol, which consists of user
        deposits and staking rewards. Because stKONET rebases daily, it
        communicates the position of the share daily.
      </p>
    </Accordion>
  );
};
