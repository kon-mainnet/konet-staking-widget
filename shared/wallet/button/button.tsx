import { FC } from 'react';
import { ButtonProps } from '@lidofinance/lido-ui';
import { useWalletModal } from '../wallet-modal/use-wallet-modal';
import { useEthereumBalance, useSDK } from '@lido-sdk/react';
import { FormatToken } from 'shared/formatters';
import { AddressBadge } from '../components/address-badge/address-badge';
import {
  WalledButtonStyle,
  WalledButtonWrapperStyle,
  WalledButtonBalanceStyle,
  WalledButtonLoaderStyle,
} from './styles';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

export const Button: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useWalletModal();
  const { account } = useSDK();
  const { data: balance, initialLoading } = useEthereumBalance(
    undefined,
    STRATEGY_LAZY,
  );

  return (
    <WalledButtonStyle
      size="sm"
      variant="text"
      color="secondary"
      onClick={() => openModal({})}
      {...rest}
    >
      <WalledButtonWrapperStyle>
        <WalledButtonBalanceStyle>
          {initialLoading ? (
            <WalledButtonLoaderStyle />
          ) : (
            <FormatToken
              amount={balance}
              symbol="KONET"
              showAmountTip={false}
            />
          )}
        </WalledButtonBalanceStyle>
        <AddressBadge address={account} />
      </WalledButtonWrapperStyle>
    </WalledButtonStyle>
  );
};
