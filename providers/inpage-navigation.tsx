import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import invariant from 'tiny-invariant';
import { dynamics } from 'config';
import { useRouter } from 'next/router';

export type InpageNavigationContextValue = {
  hashNav: string;
  navigateInpageAnchor: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const InpageNavigationContext =
  createContext<InpageNavigationContextValue | null>(null);
InpageNavigationContext.displayName = 'InpageNavigationContext';

// IPFS-compatible hash-based in-page navigation
export const InpageNavigationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { asPath } = useRouter();
  const [hashNav, setHash] = useState('');

  useEffect(() => {
    if (dynamics.ipfsMode) return; // Hash is reserved in ipfs mode, ignored here
    const hash = asPath.split('#')[1];
    setHash(hash);
  }, [asPath]);

  const navigateInpageAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href) return;
      const hash = href.split('#')[1];
      e.preventDefault();

      // Remember the hash
      setHash(hash);

      // Perform animated scroll
      document.getElementById(hash)?.scrollIntoView({
        behavior: 'smooth',
      });

      // Change the hash for non-ipfs ui, without scrolling the page
      // We have done animated scroll already on next step
      if (!dynamics.ipfsMode) {
        history.pushState({}, '', `#${hash}`);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      hashNav,
      navigateInpageAnchor,
    }),
    [hashNav, navigateInpageAnchor],
  );

  return (
    <InpageNavigationContext.Provider value={value}>
      {children}
    </InpageNavigationContext.Provider>
  );
};

export const useInpageNavigation = () => {
  const value = useContext(InpageNavigationContext);
  invariant(
    value !== null,
    'useInpageNavigation was used used outside of InpageNavigationProvider',
  );
  return value;
};
