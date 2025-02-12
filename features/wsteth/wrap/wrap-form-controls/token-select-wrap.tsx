import { trackEvent } from '@lidofinance/analytics-matomo';
import { TOKENS_TO_WRAP } from 'features/wsteth/shared/types';
import { MATOMO_CLICK_EVENTS } from 'config';
import { TokenSelectHookForm } from 'shared/hook-form/controls/token-select-hook-form';

const OPTIONS = [
  {
    label: 'stKONET',
    token: TOKENS_TO_WRAP.STETH,
  },
  {
    label: 'KONET',
    token: TOKENS_TO_WRAP.ETH,
  },
];

type TokenSelectWrapProps = Pick<
  React.ComponentProps<typeof TokenSelectHookForm>,
  'warning'
>;

export const TokenSelectWrap = (props: TokenSelectWrapProps) => {
  return (
    <TokenSelectHookForm
      //@ts-expect-error: need to update package
      options={OPTIONS}
      onChange={(value) => {
        trackEvent(
          //@ts-expect-error: need to update package
          ...(value === TOKENS_TO_WRAP.ETH
            ? MATOMO_CLICK_EVENTS.wrapTokenSelectEth
            : MATOMO_CLICK_EVENTS.wrapTokenSelectSteth),
        );
      }}
      {...props}
    />
  );
};
