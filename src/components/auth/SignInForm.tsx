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
  username: string;
  password: string;
  persistent: boolean;
};

export default function SignInForm() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Stack gap={2}>
      <Typography level="h2">Welcome back</Typography>
      <Typography level="body2">
        Let's get started! Please enter your details.
      </Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        onSubmit={onSubmit}
      >
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
        <Stack direction="row" justifyContent="space-between">
          <Checkbox
            size="sm"
            label="Remember for 30 days"
            {...register('persistent')}
          />
          <Link
            fontSize="sm"
            fontWeight="lg"
            onClick={() => nav('/auth/forgot-password')}
          >
            Forgot password
          </Link>
        </Stack>
        <Button type="submit" fullWidth loading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography level="body2">Don't have an account?</Typography>
        <Link fontSize="sm" fontWeight="lg" onClick={() => nav('/auth/signup')}>
          Sign up
        </Link>
      </Stack>
    </Stack>
  );
}
