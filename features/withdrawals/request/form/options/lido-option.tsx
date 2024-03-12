import { useWatch } from 'react-hook-form';

import { Tooltip, Question } from '@lidofinance/lido-ui';
import { TOKENS } from '@lido-sdk/constants';

import { useEthAmountByStethWsteth } from 'features/withdrawals/hooks';
import { useInpageNavigation } from 'providers/inpage-navigation';
import { RequestFormInputType } from 'features/withdrawals/request/request-form-context';

import {
  trackMatomoEvent,
  MATOMO_CLICK_EVENTS_TYPES,
} from 'config/trackMatomoEvent';

import {
  FormatTokenStyled,
  LidoIcon,
  LidoOptionContainer,
  LidoOptionValue,
  LidoOptionInlineLoader,
} from './styles';
import { OnlyInfraRender } from 'shared/components/only-infra-render';

const TooltipWithdrawalAmount = () => {
  const { navigateInpageAnchor } = useInpageNavigation();

  return (
    <Tooltip
      placement="topRight"
      title={
        <>
          The final amount of claimable KONET can differ
          <OnlyInfraRender>
            <br /> For more info, please read{' '}
            <a
              data-testid="lidoOptionToolTipFAQ"
              href="#amountDifferentFromRequested"
              onClick={(e) => {
                trackMatomoEvent(
                  MATOMO_CLICK_EVENTS_TYPES.withdrawalFAQtooltipEthAmount,
                );
                navigateInpageAnchor(e);
              }}
            >
              FAQ
            </a>
          </OnlyInfraRender>
        </>
      }
    >
      <Question />
    </Tooltip>
  );
};

export const LidoOption = () => {
  const [token, amount] = useWatch<RequestFormInputType, ['token', 'amount']>({
    name: ['token', 'amount'],
  });

  const { amount: ethAmount, loading: amountLoading } =
    useEthAmountByStethWsteth({
      isSteth: token === TOKENS.STETH,
      amount,
    });

  return (
    <LidoOptionContainer data-testid="lidoOptionSection">
      <LidoIcon />
      Lido
      <LidoOptionValue data-testid="lidoOptionAmount">
        {amountLoading && <LidoOptionInlineLoader />}
        {!amountLoading && (
          <>
            <FormatTokenStyled
              data-testid="lidoOptionAmount"
              amount={ethAmount}
              symbol="KONET"
            />{' '}
            <TooltipWithdrawalAmount />
          </>
        )}
      </LidoOptionValue>
    </LidoOptionContainer>
  );
};
