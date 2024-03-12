import { CHAINS } from '@lido-sdk/constants';
import { useSDK } from '@lido-sdk/react';
import { Text, Link } from '@lidofinance/lido-ui';
import { SunsetMessageStyle } from './styles';

const URL_INFORMATION = 'https://docs.lido.fi/deployed-contracts/goerli/';
const URL_HOLESKY =
  'https://konetmain.com/deployed-contracts/holesky/#hole%C5%A1ky-testnet';

export const GoerliSunsetBanner = () => {
  const { chainId } = useSDK();

  if (chainId !== CHAINS.Goerli) return null;

  return (
    <SunsetMessageStyle>
      <Text weight={700} size="sm">
        The KONET testnet on Görli will no longer be supported after February
        29th, 2024.
      </Text>
      <Text weight={400} size="xxs">
        If you have (w)stKONET to withdraw, please do so before this date.
        Additional information can be found{' '}
        <Link href={URL_INFORMATION}>here</Link>, and you can locate the Testnet
        staking widget on <Link href={URL_HOLESKY}>Holesky</Link>.
      </Text>
    </SunsetMessageStyle>
  );
};
