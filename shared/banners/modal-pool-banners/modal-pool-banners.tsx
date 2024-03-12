import { trackEvent } from '@lidofinance/analytics-matomo';
import { Curve } from 'shared/banners/curve';
import { MATOMO_CLICK_EVENTS } from 'config';

import { TextStyles, DescStyles, ButtonLinkWrap, ButtonStyled } from './styles';

const ECOSYSTEM_LINK = 'https://konetmain.com/lido-ecosystem';

const linkClickHandler = () =>
  trackEvent(...MATOMO_CLICK_EVENTS.clickExploreDeFi);

export const ModalPoolBanners = () => {
  const linkProps = {
    href: ECOSYSTEM_LINK,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <>
      <TextStyles>
        <b>Explore DeFi</b>
        <DescStyles>
          Use your stKONET/wstKONET to get even bigger rewards
        </DescStyles>
      </TextStyles>
      <Curve />
      <ButtonLinkWrap {...linkProps} onClick={linkClickHandler}>
        <ButtonStyled fullwidth color="success">
          Explore more DeFi options
        </ButtonStyled>
      </ButtonLinkWrap>
    </>
  );
};
