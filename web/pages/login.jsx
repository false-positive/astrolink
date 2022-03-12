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
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { login } from '../api/user';

const Login = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    if ((await login(data)) === true) {
      router.push('/');
    } else {
      alert('Invalid email or password');
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Center style={{ height: '100vh' }}>
      <Group direction="column" sx={{ width: '438px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <InputWrapper sx={{ width: '100%' }} label="Email Address" required>
            <Input
              {...register('email')}
              name="email"
              icon={<MdOutlineAlternateEmail />}
              placeholder="Your email"
              size="md"
            />
          </InputWrapper>

          <PasswordInput
            {...register('password')}
            name="password"
            sx={{ width: '100%' }}
            placeholder="Password"
            label="Password"
            required
            size="md"
          />

          <Center
            sx={{ width: '100%', marginTop: '0.5rem', marginBottom: '0' }}
          >
            <Input size="md" component="button">
              Login
            </Input>
          </Center>
          <Center sx={{ width: '100%' }}>
            <Text>
              {"Don't have an account? "}
              <Link href="/register" passHref>
                <Anchor>Create one!</Anchor>
              </Link>
            </Text>
          </Center>
        </form>
      </Group>
    </Center>
  );
};

export default Login;
