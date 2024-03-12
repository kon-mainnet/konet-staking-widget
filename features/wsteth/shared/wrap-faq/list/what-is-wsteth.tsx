import { FC } from 'react';
import { Accordion } from '@lidofinance/lido-ui';

export const WhatIsWsteth: FC = () => {
  return (
    <Accordion defaultExpanded summary="What is wstKONET?">
      <p>
        wstKONET (wrapped stKONET) is a non-rebasing version of stKONET,
        wstKONET&apos;s price denominated in stKONET changes instead. The
        wstKONET balance can only be changed upon transfers, minting, and
        burning. At any given time, anyone holding wstKONET can convert any
        amount of it to stKONET at a fixed rate, and vice versa. Normally, the
        rate gets updated once a day, when stKONET undergoes a rebase.
      </p>
    </Accordion>
  );
};
