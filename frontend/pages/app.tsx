import React from 'react';
import SideMenu from '../components/SideMenu';
import { withAuthSync } from '../core/services/auth';
import Head from 'next/head';

const App = () => {
  return (
    <SideMenu>
      <Head>
        <title>Home - Start</title>
      </Head>
    </SideMenu>
  );
};

export default withAuthSync(App);