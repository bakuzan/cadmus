'use client';

import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type FullLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    activeClassName: string;
    children: ReactNode;
  };

export default function ActiveLink(props: FullLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === props.href || pathname.startsWith(props.href + '/');

  return (
    <Link
      {...props}
      className={[props.className, isActive ? props.activeClassName : ''].join(
        ' '
      )}
    />
  );
}
