import { EnvConfigRaw, EnvConfigParsed } from 'config/types';
import { CHAINS } from 'utils/chains';

export const parseEnvConfig = (envConfig: EnvConfigRaw): EnvConfigParsed => {
  return {
    defaultChain: Number(envConfig.defaultChain),
    supportedChainIds: envConfig.supportedChains,
    prefillUnsafeElRpcUrls: {
      [CHAINS.Konet]: envConfig.prefillUnsafeElRpcUrls1,
    },
    ipfsMode: envConfig.ipfsMode,
    walletconnectProjectId: envConfig.walletconnectProjectId,
  };
};
