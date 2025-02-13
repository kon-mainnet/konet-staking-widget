import { FC, memo, useMemo } from 'react';

import { getEtherscanTokenLink } from '@lido-sdk/helpers';
import { useSDK } from '@lido-sdk/react';
import { getTokenAddress, TOKENS } from '@lido-sdk/constants';
import { Block, DataTable, Question, Tooltip } from '@lidofinance/lido-ui';

import { Section, MatomoLink } from 'shared/components';
import { useLidoApr, useLidoStats } from 'shared/hooks';
import {
  DATA_UNAVAILABLE,
  LIDO_APR_TOOLTIP_TEXT,
  MATOMO_CLICK_EVENTS_TYPES,
  dynamics,
} from 'config';

import { FlexCenterVertical } from './styles';
import { LidoStatsItem } from './lido-stats-item';

const isStatItemAvailable = (val: any): boolean => {
  return val && val !== 'N/A';
};

export const LidoStats: FC = memo(() => {
  const { chainId } = useSDK();
  const etherscanLink = useMemo(() => {
    return getEtherscanTokenLink(
      chainId,
      getTokenAddress(chainId, TOKENS.STETH),
    );
  }, [chainId]);

  const lidoApr = useLidoApr();
  const lidoStats = useLidoStats();

  const showApr = !dynamics.ipfsMode || isStatItemAvailable(lidoApr.apr);
  const showTotalStaked =
    !dynamics.ipfsMode || isStatItemAvailable(lidoStats.data.totalStaked);
  const showStakers =
    !dynamics.ipfsMode || isStatItemAvailable(lidoStats.data.stakers);
  const showMarketCap =
    !dynamics.ipfsMode || isStatItemAvailable(lidoStats.data.marketCap);

  if (!showApr && !showTotalStaked && !showStakers && !showMarketCap) {
    return null;
  }

  return (
    <Section
      title="Lido statistics"
      headerDecorator={
        <MatomoLink
          href={etherscanLink}
          data-testid="statEtherscanBtn"
          matomoEvent={MATOMO_CLICK_EVENTS_TYPES.viewEtherscanOnStakePage}
        >
          View on KonetExplorer
        </MatomoLink>
      }
    >
      <Block>
        <DataTable>
          <LidoStatsItem
            title={
              <FlexCenterVertical data-testid="aprTooltip">
                Annual percentage rate
                <Tooltip title={LIDO_APR_TOOLTIP_TEXT}>
                  <Question />
                </Tooltip>
              </FlexCenterVertical>
            }
            show={showApr}
            loading={lidoApr.initialLoading}
            dataTestId="lidoAPR"
            highlight
          >
            {lidoApr.apr ? `${lidoApr.apr}%` : DATA_UNAVAILABLE}
          </LidoStatsItem>

          <LidoStatsItem
            title="Total staked with KONET"
            show={showTotalStaked}
            loading={lidoStats.initialLoading}
            dataTestId="totalStaked"
          >
            {lidoStats.data.totalStaked}
          </LidoStatsItem>

          <LidoStatsItem
            title="Stakers"
            show={showStakers}
            loading={lidoStats.initialLoading}
            dataTestId="stakers"
          >
            {lidoStats.data.stakers}
          </LidoStatsItem>

          <LidoStatsItem
            title="stKONET market cap"
            show={showMarketCap}
            loading={lidoStats.initialLoading}
            dataTestId="stEthMarketCap"
          >
            {lidoStats.data.marketCap}
          </LidoStatsItem>
        </DataTable>
      </Block>
    </Section>
  );
});
