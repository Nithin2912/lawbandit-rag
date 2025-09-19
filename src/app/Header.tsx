'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/" style={{ fontWeight: pathname === '/' ? 'bold' : 'normal' }}>
        Home
      </Link>
      <Link href="/about" style={{ fontWeight: pathname === '/about' ? 'bold' : 'normal' }}>
        About
      </Link>
      <Link href="/contact" style={{ fontWeight: pathname === '/contact' ? 'bold' : 'normal' }}>
        Contact
      </Link>
    </header>
  );
}
