import { memo } from 'react';
import { Divider, Text } from '@lidofinance/lido-ui';
import { TOKENS } from '@lido-sdk/constants';
import {
  useSDK,
  useEthereumBalance,
  useSTETHBalance,
  useWSTETHBalance,
  useTokenAddress,
} from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot/web3-react';
import { FormatToken } from 'shared/formatters';
import { TokenToWallet } from 'shared/components';
import { useWstethBySteth, useStethByWsteth } from 'shared/hooks';
import type { WalletComponentType } from 'shared/wallet/types';
import { CardBalance, CardRow, CardAccount, Fallback } from 'shared/wallet';
import { StyledCard } from './styles';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

const WalletComponent: WalletComponentType = (props) => {
  const { account } = useSDK();
  const ethBalance = useEthereumBalance(undefined, STRATEGY_LAZY);
  const stethBalance = useSTETHBalance(STRATEGY_LAZY);
  const wstethBalance = useWSTETHBalance(STRATEGY_LAZY);

  const stethAddress = useTokenAddress(TOKENS.STETH);
  const wstethAddress = useTokenAddress(TOKENS.WSTETH);

  const wstethBySteth = useWstethBySteth(stethBalance.data);
  const stethByWsteth = useStethByWsteth(wstethBalance.data);

  return (
    <StyledCard data-testid="wrapCardSection" {...props}>
      <CardRow>
        <CardBalance
          title="KONET Balance"
          loading={ethBalance.initialLoading}
          value={
            <FormatToken
              data-testid="ethBalance"
              amount={ethBalance.data}
              symbol="KONET"
            />
          }
        />
        <CardAccount account={account} />
      </CardRow>
      <Divider />
      <CardRow>
        <CardBalance
          small
          title="stKONET Balance"
          loading={stethBalance.initialLoading || wstethBySteth.initialLoading}
          value={
            <>
              <FormatToken
                data-testid="stEthBalance"
                amount={stethBalance.data}
                symbol="stKONET"
              />
              <TokenToWallet
                data-testid="addStethToWalletBtn"
                address={stethAddress}
              />
              <Text size={'xxs'} color={'secondary'}>
                <FormatToken
                  data-testid="wstEthBalanceOption"
                  amount={wstethBySteth.data}
                  symbol="wstKONET"
                  approx={true}
                />
              </Text>
            </>
          }
        />
        <CardBalance
          small
          title="wstKONET Balance"
          loading={wstethBalance.initialLoading || stethByWsteth.initialLoading}
          value={
            <>
              <FormatToken
                data-testid="wstEthBalance"
                amount={wstethBalance.data}
                symbol="wstKONET"
              />
              <TokenToWallet
                data-testid="addWstethToWalletBtn"
                address={wstethAddress}
              />
              <Text size={'xxs'} color={'secondary'}>
                <FormatToken
                  data-testid="stethBalanceOption"
                  amount={stethByWsteth.data}
                  symbol="stKONET"
                  approx={true}
                />
              </Text>
            </>
          }
        />
      </CardRow>
    </StyledCard>
  );
};

export const Wallet: WalletComponentType = memo((props) => {
  const { active } = useWeb3();
  return active ? <WalletComponent {...props} /> : <Fallback {...props} />;
});
