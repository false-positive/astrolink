import { Button } from '@mantine/core';
import Link from 'next/link';
import Page from '../components/Page';

export default function Home() {
  return (
    <Page>
      <Link href="/" passHref>
        <Button component="a">Next link button</Button>
      </Link>
    </Page>
  );
}
