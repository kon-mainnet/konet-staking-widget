import { BigNumber } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import { useLidoSWR, useSDK, useSTETHContractRPC } from '@lido-sdk/react';

import { getConfig } from 'config';
const { ESTIMATE_ACCOUNT, ESTIMATE_AMOUNT, STAKE_GASLIMIT_FALLBACK } =
  getConfig();
import { STRATEGY_CONSTANT } from 'consts/swr-strategies';

import { applyGasLimitRatio } from './utils';

type UseStethSubmitGasLimit = () => BigNumber;

export const useStethSubmitGasLimit: UseStethSubmitGasLimit = () => {
  const stethContractRPC = useSTETHContractRPC();

  const { chainId } = useSDK();
  const { data } = useLidoSWR(
    ['submit-gas-limit', chainId],
    async () => {
      const gasLimit = await stethContractRPC.estimateGas.submit(AddressZero, {
        from: ESTIMATE_ACCOUNT,
        value: ESTIMATE_AMOUNT,
      });
      return applyGasLimitRatio(gasLimit);
    },
    STRATEGY_CONSTANT,
  );

  return data ?? STAKE_GASLIMIT_FALLBACK;
};
