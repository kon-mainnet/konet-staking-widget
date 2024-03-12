import { Stake } from './stake';
import Head from 'next/head';
import { FC } from 'react';
import { Layout } from 'shared/components';

export { Stake } from './stake';

export const StakePage: FC = () => {
  return (
    <Layout
      title="Stake KONET"
      subtitle="Stake KONET and receive stKONET while staking."
    >
      <Head>
        <title>Stake with KONET</title>
      </Head>
      <Stake />
    </Layout>
  );
};
