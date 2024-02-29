import invariant from 'tiny-invariant';
import {
  FC,
  PropsWithChildren,
  useMemo,
  createContext,
  useContext,
} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useUnwrapFormNetworkData } from '../hooks/use-unwrap-form-network-data';
import { useUnwrapFormProcessor } from '../hooks/use-unwrap-form-processing';
import { useUnwrapFormValidationContext } from '../hooks/use-unwra-form-validation-context';

import { FormControllerContext } from 'shared/hook-form/form-controller';

import {
  UnwrapFormDataContextValueType,
  UnwrapFormInputType,
  UnwrapFormValidationContext,
} from './types';
import { UnwrapFormValidationResolver } from './unwrap-form-validators';
import { useDebouncedStethByWsteth } from 'features/wsteth/shared/hooks/use-debounced-wsteth-steth';

//
// Data context
//
const UnwrapFormDataContext =
  createContext<UnwrapFormDataContextValueType | null>(null);
UnwrapFormDataContext.displayName = 'UnwrapFormDataContext';

export const useUnwrapFormData = () => {
  const value = useContext(UnwrapFormDataContext);
  invariant(value, 'useUnwrapFormData was used outside the provider');
  return value;
};

//
// Data provider
//
export const UnwrapFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const networkData = useUnwrapFormNetworkData();
  const validationContextPromise = useUnwrapFormValidationContext({
    networkData,
  });

  const formObject = useForm<
    UnwrapFormInputType,
    Promise<UnwrapFormValidationContext>
  >({
    defaultValues: {
      amount: null,
      dummyErrorField: null,
    },
    context: validationContextPromise,
    criteriaMode: 'firstError',
    mode: 'onChange',
    resolver: UnwrapFormValidationResolver,
  });

  const { watch } = formObject;
  const [amount] = watch(['amount']);

  const processUnwrapFormFlow = useUnwrapFormProcessor({
    onConfirm: networkData.revalidateUnwrapFormData,
  });

  const { data: willReceiveStETH, initialLoading: isWillReceiveStETHLoading } =
    useDebouncedStethByWsteth(amount);

  const value = useMemo(
    (): UnwrapFormDataContextValueType => ({
      ...networkData,
      willReceiveStETH,
      isWillReceiveStETHLoading,
      onSubmit: processUnwrapFormFlow,
    }),
    [
      networkData,
      processUnwrapFormFlow,
      willReceiveStETH,
      isWillReceiveStETHLoading,
    ],
  );

  return (
    <FormProvider {...formObject}>
      <UnwrapFormDataContext.Provider value={value}>
        <FormControllerContext.Provider value={value}>
          {children}
        </FormControllerContext.Provider>
      </UnwrapFormDataContext.Provider>
    </FormProvider>
  );
};
