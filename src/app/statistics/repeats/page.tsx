import React from 'react';

import getPageTitle from '@/utils/getPageTitle';

// import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Repeats')
};

export default async function Repeats() {
  return (
    <>
      <h1>Repeats</h1>
      <div>Placeholder for the repeats work to come...</div>
    </>
  );
}
