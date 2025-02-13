//import { Eth } from '@lidofinance/lido-ui';
import { TokenAmountInputHookForm } from 'shared/hook-form/controls/token-amount-input-hook-form';
import { useStakeFormData } from '../stake-form-context';
import { useStakingLimitWarning } from 'shared/hooks/use-staking-limit-warning';

export const StakeAmountInput = () => {
  const { maxAmount, stakingLimitInfo } = useStakeFormData();
  const { limitWarning, limitError } = useStakingLimitWarning(
    stakingLimitInfo?.stakeLimitLevel,
  );
  return (
    <TokenAmountInputHookForm
      fieldName="amount"
      token={'ETH'}
      data-testid="stakeInput"
      leftDecorator={
        <svg
          id="layer2"
          data-name="Layer2"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <g id="layer2" data-name="Layer2">
            <g>
              <path
                className="cls-2"
                d="M374.95,169.81c-9.99,14.35-15.03,31.46-15,48.95v.25c0,12.04-1.85,23.64-5.28,34.55-14.8,47.09-59.06,81.13-111.18,80.52-62.17-.73-112.96-51.52-113.69-113.69-.61-52.12,33.43-96.38,80.52-111.18,10.91-3.43,22.51-5.28,34.55-5.28h.2c13.53.02,26.77-3.9,37.88-11.63l47.07-32.76c-25.37-13.58-54.36-21.28-85.15-21.28-18.91,0-37.13,2.91-54.26,8.29-73.31,23.04-126.49,91.54-126.49,172.46,0,99.43,81.32,180.75,180.75,180.75,80.92,0,149.41-53.18,172.46-126.49,5.38-17.13,8.29-35.35,8.29-54.26,0-32.22-8.44-62.46-23.21-88.66l-27.46,39.46h0Z"
              />
              <path
                className="cls-1"
                d="M288.7,356.26c-1.4,0-2.8-.02-4.19-.05-32.34-.73-52.08-32.85-42.71-60.87,5.95-17.8,151.53-224.84,151.53-224.84,0,0-209.72,141.73-224.13,147.28-28.76,11.08-62.64-9.45-62.8-42.96v-.87c0-81.59,53.64-150.68,127.58-173.92-.88,0-1.76-.03-2.64-.03C103.57,0,0,103.57,0,231.33s103.2,231.34,231.34,231.34,231.33-103.57,231.33-231.33c0-.88-.02-1.76-.03-2.64-23.24,73.94-92.32,127.57-173.93,127.57h0Z"
              />
              <path
                className="cls-2"
                d="M387.41,368.49c-76.38.36-101.74,67.21-151.86,56.41-39.17-8.44-34.71-51.64-88.22-69.42-41.21-13.7-58.26,7.13-80.99-10.12-29.69-22.53-8.25-63.85-43.39-111.36-5.44-7.35-13.45-16.49-21.96-24.02C.35,217.02,0,224.14,0,231.35,0,359.49,103.2,462.69,231.34,462.69c75.34,0,142.25-36.02,184.49-91.77-9.95-1.7-20.1-2.45-28.42-2.41v-.02Z"
              />
              <path
                className="cls-2"
                d="M414.52,42.53l-3.41-17.53-3.41,17.53c-1.06,5.45-5.32,9.7-10.76,10.76l-17.53,3.41,17.53,3.41c5.45,1.06,9.7,5.32,10.76,10.76l3.41,17.53,3.41-17.53c1.06-5.45,5.32-9.7,10.76-10.76l17.53-3.41-17.53-3.41c-5.45-1.06-9.7-5.32-10.76-10.76Z"
              />
            </g>
          </g>
        </svg>
      }
      maxValue={maxAmount}
      error={limitError}
      warning={limitWarning}
    />
  );
};
