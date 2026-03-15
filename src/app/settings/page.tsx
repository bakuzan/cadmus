import { getSettingsAsync } from '@/database/settings';

import SettingsForm from '@/components/SettingsForm';

import getPageTitle from '@/utils/getPageTitle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Settings')
};

export default async function Settings() {
  const settings = await getSettingsAsync();
  console.log(settings);
  return (
    <>
      <h1>Settings</h1>
      <SettingsForm data={settings} />
    </>
  );
}
