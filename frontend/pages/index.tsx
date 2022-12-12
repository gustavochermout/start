import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

const Home = () => (
  <>
    <Head>
      <title>Start</title>
    </Head>
    <Link href="/login">
      <Button
        style={{ margin: '10px' }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </Link>
  </>
);

Home.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(301, { Location: '/app' });
    res.end();
  }

  return {};
};

export default Home;