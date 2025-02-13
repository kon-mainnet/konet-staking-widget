import { memo } from 'react';

import { WrapFormStats } from './wrap-stats';
import { WrapBlock } from '../../shared/styles';
import { WrapFormProvider } from '../wrap-form-context/wrap-form-context';
import { FormController } from 'shared/hook-form/form-controller';
import { InputGroupWrap } from '../wrap-form-controls/input-group-wrap';
import { SubmitButtonWrap } from '../wrap-form-controls/submit-button-wrap';

import { L2Wsteth } from 'shared/banners/l2-wsteth';
import { MATOMO_CLICK_EVENTS } from 'config';
export const WrapForm: React.FC = memo(() => {
  return (
    <WrapFormProvider>
      <WrapBlock data-testid="wrapForm">
        <FormController>
          <InputGroupWrap />
          <SubmitButtonWrap />
        </FormController>
        <L2Wsteth matomoEventLink={MATOMO_CLICK_EVENTS.l2BannerWrap} />
        <WrapFormStats />
      </WrapBlock>
    </WrapFormProvider>
  );
});
