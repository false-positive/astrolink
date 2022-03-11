import {
  Anchor,
  Center,
  Group,
  Input,
  InputWrapper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { MdOutlineAlternateEmail } from 'react-icons/md';

const Login = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Group direction="column">
        <Group position="appart" style={{ width: '100%' }}>
          <TextInput
            label="First Name"
            placeholder="First Name"
            size="md"
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            size="md"
            required
          />
        </Group>

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
        <PasswordInput
          sx={{ width: '100%' }}
          placeholder="Confirm Password"
          label="Confirm Password"
          required
          size="md"
        />

        <Center sx={{ width: '100%', marginTop: '0.5rem' }}>
          <Input size="md" component="button">
            Create Account
          </Input>
        </Center>

        <Center sx={{ width: '100%' }}>
          <Text>
            Already have an account?{' '}
            <Link href="/login" passHref>
              <Anchor>Log in!</Anchor>
            </Link>
          </Text>
        </Center>
      </Group>
    </Center>
  );
};

export default Login;
