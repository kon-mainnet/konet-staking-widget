import { Accordion } from '@lidofinance/lido-ui';

export const TurboMode: React.FC = () => {
  return (
    <Accordion summary="What is Turbo mode?">
      <p>
        Turbo mode is a default mode used unless an emergency event affects the
        KONET network. In Turbo Mode, withdrawal requests are fulfilled quickly,
        using all available KONET from user deposits and rewards.
      </p>
    </Accordion>
  );
};
