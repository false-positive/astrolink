import {
  Anchor,
  Center,
  Group,
  Input,
  InputWrapper,
  PasswordInput,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { MdOutlineAlternateEmail } from 'react-icons/md';

const Login = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Group direction="column" sx={{ width: '438px' }}>
        <InputWrapper sx={{ width: '100%' }} label="Email Address" required>
          <Input
            icon={<MdOutlineAlternateEmail />}
            placeholder="Your email"
            size="md"
          />
        </InputWrapper>

        <PasswordInput
          sx={{ width: '100%' }}
          placeholder="Password"
          label="Password"
          required
          size="md"
        />

        <Center sx={{ width: '100%', marginTop: '0.5rem', marginBottom: '0' }}>
          <Input size="md" component="button">
            Login
          </Input>
        </Center>
        <Center sx={{ width: '100%' }}>
          <Text>
            Don't have an account?{' '}
            <Link href="/register" passHref>
              <Anchor>Create one!</Anchor>
            </Link>
          </Text>
        </Center>
      </Group>
    </Center>
  );
};

export default Login;
