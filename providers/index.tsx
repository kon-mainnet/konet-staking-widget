import { FC, PropsWithChildren } from 'react';
import { CookieThemeProvider } from '@lidofinance/lido-ui';
import { GlobalStyle } from 'styles';

import { AppFlagProvider } from './app-flag';
import { ClientConfigProvider } from './client-config';
import { IPFSInfoBoxStatusesProvider } from './ipfs-info-box-statuses';
import ModalProvider from './modals';
import Web3Provider from './web3';

export { MODAL, ModalContext } from './modals';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ClientConfigProvider>
    <AppFlagProvider>
      <CookieThemeProvider>
        <GlobalStyle />
        <Web3Provider>
          <IPFSInfoBoxStatusesProvider>
            <ModalProvider>{children}</ModalProvider>
          </IPFSInfoBoxStatusesProvider>
        </Web3Provider>
      </CookieThemeProvider>
    </AppFlagProvider>
  </ClientConfigProvider>
);
