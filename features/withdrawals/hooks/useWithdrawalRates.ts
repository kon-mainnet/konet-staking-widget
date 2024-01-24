import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { BigNumber } from 'ethers';

import { Zero } from '@ethersproject/constants';
import { CHAINS, getTokenAddress, TOKENS } from '@lido-sdk/constants';
import { useLidoSWR } from '@lido-sdk/react';

import { useDebouncedValue } from 'shared/hooks/useDebouncedValue';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

import { RequestFormInputType } from '../request/request-form-context';
import { getOpenOceanRate } from 'utils/get-open-ocean-rate';
import { standardFetcher } from 'utils/standardFetcher';

type GetWithdrawalRateParams = {
  amount: BigNumber;
  token: TOKENS.STETH | TOKENS.WSTETH;
};

type RateCalculationResult = {
  rate: number;
  toReceive: BigNumber;
};

type SingleWithdrawalRateResult = {
  name: string;
  rate: number | null;
  toReceive: BigNumber | null;
};

type GetRateType = (
  params: GetWithdrawalRateParams,
) => Promise<SingleWithdrawalRateResult>;

type GetWithdrawalRateResult = SingleWithdrawalRateResult[];

const RATE_PRECISION = 100000;
const RATE_PRECISION_BN = BigNumber.from(RATE_PRECISION);

const calculateRateReceive = (
  amount: BigNumber,
  src: BigNumber,
  dest: BigNumber,
): RateCalculationResult => {
  const _rate = dest.mul(RATE_PRECISION_BN).div(src);
  const toReceive = amount.mul(dest).div(src);
  const rate = _rate.toNumber() / RATE_PRECISION;
  return { rate, toReceive };
};

const getOpenOceanWithdrawalRate: GetRateType = async ({ amount, token }) => {
  if (amount && amount.gt(Zero)) {
    try {
      const rate = await getOpenOceanRate(amount, token, 'ETH');
      return {
        name: 'openOcean',
        ...rate,
      };
    } catch (e) {
      console.warn('[getOpenOceanRate] Failed to receive withdraw rate', e);
    }
  }

  return {
    name: 'openOcean',
    rate: null,
    toReceive: null,
  };
};

type ParaSwapPriceResponsePartial = {
  priceRoute: {
    srcAmount: string;
    destAmount: string;
  };
};

const getParaSwapRate: GetRateType = async ({ amount, token }) => {
  let rateInfo: RateCalculationResult | null;

  try {
    if (amount.isZero() || amount.isNegative()) {
      return {
        name: 'paraswap',
        rate: 0,
        toReceive: BigNumber.from(0),
      };
    }
    const capped_amount = amount;
    const api = `https://apiv5.paraswap.io/prices`;
    const query = new URLSearchParams({
      srcToken: getTokenAddress(CHAINS.Mainnet, token),
      srcDecimals: '18',
      destToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      destDecimals: '18',
      side: 'SELL',
      excludeDirectContractMethods: 'true',
      userAddress: '0x0000000000000000000000000000000000000000',
      amount: capped_amount.toString(),
      network: '1',
      partner: 'lido',
    });

    const url = `${api}?${query.toString()}`;
    const data: ParaSwapPriceResponsePartial =
      await standardFetcher<ParaSwapPriceResponsePartial>(url);

    rateInfo = calculateRateReceive(
      amount,
      BigNumber.from(data.priceRoute.srcAmount),
      BigNumber.from(data.priceRoute.destAmount),
    );
  } catch {
    rateInfo = null;
  }

  return {
    name: 'paraswap',
    rate: rateInfo?.rate ?? null,
    toReceive: rateInfo?.toReceive ?? null,
  };
};

const getWithdrawalRates = async (
  params: GetWithdrawalRateParams,
): Promise<GetWithdrawalRateResult> => {
  const rates = await Promise.all([
    getOpenOceanWithdrawalRate(params),
    getParaSwapRate(params),
  ]);

  if (rates.length > 1) {
    // sort by rate, then alphabetic
    rates.sort((r1, r2) => {
      const rate1 = r1.rate ?? 0;
      const rate2 = r2.rate ?? 0;
      if (rate1 == rate2) {
        if (r1.name < r2.name) {
          return -1;
        }
        if (r1.name > r2.name) {
          return 1;
        }
        return 0;
      }
      return rate2 - rate1;
    });
  }

  return rates;
};

type useWithdrawalRatesOptions = {
  fallbackValue?: BigNumber;
};

export const useWithdrawalRates = ({
  fallbackValue = Zero,
}: useWithdrawalRatesOptions = {}) => {
  const [token, amount] = useWatch<RequestFormInputType, ['token', 'amount']>({
    name: ['token', 'amount'],
  });
  const fallbackedAmount = amount ?? fallbackValue;
  const debouncedAmount = useDebouncedValue(fallbackedAmount, 1000);
  const swr = useLidoSWR(
    ['swr:withdrawal-rates', debouncedAmount, token],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_, amount, token) =>
      getWithdrawalRates({
        amount: amount as BigNumber,
        token: token as TOKENS.STETH | TOKENS.WSTETH,
      }),
    {
      ...STRATEGY_LAZY,
      isPaused: () => !debouncedAmount || !debouncedAmount._isBigNumber,
    },
  );

  const bestRate = useMemo(() => {
    return swr.data?.[0]?.rate ?? null;
  }, [swr.data]);

  return {
    amount: fallbackedAmount,
    bestRate,
    selectedToken: token,
    data: swr.data,
    get initialLoading() {
      return swr.initialLoading || !debouncedAmount.eq(fallbackedAmount);
    },
    get loading() {
      return swr.loading || !debouncedAmount.eq(fallbackedAmount);
    },
    get error() {
      return swr.error;
    },
    update: swr.update,
  };
};
