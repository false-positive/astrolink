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
import { useForm } from 'react-hook-form';
import { register as registerAccount } from '../api/user';

const Register = () => {
  const onSubmit = (data) => {
    registerAccount(data);
  };

  const { register, handleSubmit } = useForm();

  return (
    <Center style={{ height: '100vh' }}>
      <Group direction="column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group position="appart" style={{ width: '100%' }}>
            <TextInput
              {...register('firstName')}
              name="firstName"
              label="First Name"
              placeholder="First Name"
              size="md"
              required
            />
            <TextInput
              {...register('lastName')}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              size="md"
              required
            />
          </Group>

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
          <PasswordInput
            {...register('passwordConfirm')}
            name="passwordConfirm"
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
        </form>
      </Group>
    </Center>
  );
};

export default Register;
