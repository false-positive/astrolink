import { Button } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/" passHref>
      <Button component="a">Next link button</Button>
    </Link>
  );
}
