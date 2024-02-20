import { Question, Tooltip } from '@lidofinance/lido-ui';

import { FormatToken } from 'shared/formatters';
import { useWaitingTime } from 'features/withdrawals/hooks';

import {
  trackMatomoEvent,
  MATOMO_CLICK_EVENTS_TYPES,
} from 'config/trackMatomoEvent';
import { QueueInfoStyled, DataTableRowStyled } from './styles';
import { useRequestFormData } from '../request-form-context';
import { useInpageNavigation } from 'providers/inpage-navigation';

export const WalletQueueTooltip = () => {
  const waitingTime = useWaitingTime('');
  const { unfinalizedStETH } = useRequestFormData();
  const { navigateInpageAnchor } = useInpageNavigation();

  const queueInfo = (
    <QueueInfoStyled>
      <DataTableRowStyled
        data-testid="modeTooltipAmount"
        title="Amount"
        loading={!unfinalizedStETH}
      >
        <FormatToken amount={unfinalizedStETH} symbol="stETH" />
      </DataTableRowStyled>
      <DataTableRowStyled
        title="Waiting time"
        data-testid="modeTooltipWaitingTime"
        loading={waitingTime.initialLoading}
      >
        {waitingTime.value}
      </DataTableRowStyled>
    </QueueInfoStyled>
  );

  const tooltipTitle = (
    <>
      The withdrawal request time depends on the mode, overall amount of stETH
      in queue and{' '}
      <a
        href="#withdrawalsPeriod"
        data-testid="otherFactorsLink"
        onClick={(e) => {
          trackMatomoEvent(
            MATOMO_CLICK_EVENTS_TYPES.withdrawalOtherFactorsTooltipMode,
          );
          navigateInpageAnchor(e);
        }}
      >
        other factors
      </a>
      .{queueInfo}
    </>
  );

  return (
    <Tooltip placement="bottom" title={tooltipTitle}>
      <Question />
    </Tooltip>
  );
};
