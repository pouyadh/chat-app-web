import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  username: string;
  password: string;
  cpassword: string;
};

import { emailRegex } from 'utils/regex';

export default function SignUpForm() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    getValues,
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Stack gap={2}>
      <Typography level="h2">Sign up</Typography>
      <Typography level="body2">
        Let's get started! Please enter your details.
      </Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        onSubmit={onSubmit}
      >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="text"
            {...register('email', {
              required: 'Required',
              pattern: {
                value: emailRegex,
                message: 'Must be a valid',
              },
            })}
            error={!!errors.email}
            color={isSubmitted && !errors.email ? 'success' : undefined}
          />
          <Typography level="body2" color="danger">
            {errors.email?.message}
          </Typography>
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            type="text"
            {...register('username', {
              required: 'Required',
              minLength: { value: 5, message: 'Minimum 5 characters' },
              maxLength: { value: 20, message: 'Maximum 20 characters' },
              pattern: {
                value: /^[A-Za-z0-9_]*$/g,
                message: 'Only Letters, numbers and underscore',
              },
            })}
            error={!!errors.username}
            color={isSubmitted && !errors.username ? 'success' : undefined}
          />
          <Typography level="body2" color="danger">
            {errors.username?.message}
          </Typography>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="•••••••"
            type="password"
            {...register('password', {
              required: 'Required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
              maxLength: { value: 20, message: 'Maximum 20 characters' },
            })}
            error={!!errors.password}
            color={isSubmitted && !errors.password ? 'success' : undefined}
          />

          <Typography level="body2" color="danger">
            {errors.password?.message}
          </Typography>
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="•••••••"
            type="password"
            {...register('cpassword', {
              required: 'Required',
              validate: (v) =>
                v === getValues().password || 'Passwords does not match',
            })}
            error={!!errors.cpassword}
            color={isSubmitted && !errors.cpassword ? 'success' : undefined}
          />

          <Typography level="body2" color="danger">
            {errors.cpassword?.message}
          </Typography>
        </FormControl>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Sign up
        </Button>
      </form>
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography level="body2">Already have an account?</Typography>
        <Link fontSize="sm" fontWeight="lg" onClick={() => nav('/auth/signin')}>
          Sign in
        </Link>
      </Stack>
    </Stack>
  );
}
