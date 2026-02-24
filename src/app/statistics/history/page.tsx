import React from 'react';

import getPageTitle from '@/utils/getPageTitle';

// import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('History')
};

export default async function History() {
  return (
    <>
      <h1>History</h1>
      <div>Placeholder for the history work to come...</div>
    </>
  );
}
