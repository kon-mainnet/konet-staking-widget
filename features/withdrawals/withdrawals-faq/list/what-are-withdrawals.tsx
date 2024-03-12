import { Accordion } from '@lidofinance/lido-ui';

export const WhatAreWithdrawals: React.FC = () => {
  return (
    <Accordion defaultExpanded summary="What are withdrawals?">
      <p>
        Users can unstake their stKONET or wstKONET through withdrawals. Upon
        unstaking stKONET, they will receive KONET at a 1:1 ratio. When
        unstaking wstKONET, the unwrapping process will take place seamlessly in
        the background.
      </p>
    </Accordion>
  );
};
