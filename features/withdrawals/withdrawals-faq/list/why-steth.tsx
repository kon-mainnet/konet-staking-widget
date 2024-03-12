import { Accordion } from '@lidofinance/lido-ui';

export const WhySTETH: React.FC = () => {
  return (
    <Accordion summary="When I try to withdraw wstKONET, why do I see the stKONET amount in my request?">
      <p>
        When you request to withdraw wstKONET, it is automatically unwrapped
        into stKONET, which then gets transformed into KONET. The main
        withdrawal period is when stKONET is transformed into KONET. That&apos;s
        why you see the amount pending denominated in stKONET.
      </p>
    </Accordion>
  );
};
