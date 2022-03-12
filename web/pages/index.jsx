import { Box, Button, Center, Group } from '@mantine/core';
import Link from 'next/link';
import WebsiteTitle from '../components/landing/WebsiteTitle';

export default function Home() {
  return (
    <Center sx={{ height: '100vh' }}>
      <Group sx={{ position: 'fixed', right: '1rem', top: '1rem' }}>
        <Link href="/login" passHref>
          <Button
            size="md"
            as="a"
            variant="outline"
            color="dark"
            sx={{ color: 'white' }}
            radius="md"
          >
            Login
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button size="md" as="a" radius="md" variant="white" color="dark">
            Sign up
          </Button>
        </Link>
        {/* <Link href="/about">Hello</Link>
        <Link href="/about">World</Link> */}
      </Group>

      <WebsiteTitle order={1} fontSize="5rem"></WebsiteTitle>
    </Center>
  );
}
