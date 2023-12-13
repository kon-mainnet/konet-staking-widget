import { FC, PropsWithChildren, useCallback } from 'react';
import { FormController } from 'shared/hook-form/form-controller/form-controller';
import { useFormContext } from 'react-hook-form';
import { WrapFormInputType } from '../wrap-form-context';

export const FormControllerWrap: FC<PropsWithChildren> = ({ children }) => {
  const {
    reset,
    getValues,
    formState: { defaultValues },
  } = useFormContext<WrapFormInputType>();

  const handleReset = useCallback(() => {
    reset({
      ...defaultValues,
      token: getValues('token'),
    });
  }, [defaultValues, getValues, reset]);

  return <FormController reset={handleReset}>{children}</FormController>;
};
