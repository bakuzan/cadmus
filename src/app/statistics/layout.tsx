import ActiveLink from '@/components/ActiveLink';

import styles from './layout.module.css';

const buildRoute = (path: string) => `/statistics/${path}`;

interface StatsNavbarLinkProps {
  title: string;
  link: string;
}

function StatsNavbarLink(props: StatsNavbarLinkProps) {
  return (
    <li>
      <ActiveLink
        className={styles.statsNavbarLink}
        activeClassName={styles.statsNavbarLinkActive}
        href={buildRoute(props.link)}
      >
        {props.title}
      </ActiveLink>
    </li>
  );
}

export default async function Statistics({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.statsNavbar}>
        <ul className={styles.statsNavbarList}>
          <StatsNavbarLink title="History" link="history" />
          <StatsNavbarLink title="The Numbers" link="numbers" />
          <StatsNavbarLink title="Repeats" link="repeats" />
        </ul>
      </div>

      <div className={styles.childrenWrapper}>{children}</div>
    </>
  );
}
