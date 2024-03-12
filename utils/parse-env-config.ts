import { EnvConfigRaw, EnvConfigParsed } from 'config/types';
import { CHAINS } from 'utils/chains';

export const parseEnvConfig = (envConfig: EnvConfigRaw): EnvConfigParsed => {
  return {
    defaultChain: Number(envConfig.defaultChain),
    supportedChainIds: envConfig.supportedChains,
    //@ts-expect-error: need to update package
    prefillUnsafeElRpcUrls: {
      [CHAINS.Mainnet]: envConfig.prefillUnsafeElRpcUrls1,
    },
    ipfsMode: envConfig.ipfsMode,
    walletconnectProjectId: envConfig.walletconnectProjectId,
  };
};
