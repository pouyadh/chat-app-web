import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import TaskAltIcon from '@mui/icons-material/TaskAlt';

type FormData = {
  password: string;
  cpassword: string;
};

const username = 'pouyadh';

export default function ResetPasswordForm() {
  const [isDone, setIsDone] = useState<boolean>(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    getValues,
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  if (!isDone) {
    return (
      <Stack gap={2}>
        <Typography level="h2">Reset Password</Typography>
        <Typography level="body2">
          Welcome back {username},<br />
          Please enter your new password
        </Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          onSubmit={onSubmit}
        >
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
            Reset Password
          </Button>
        </form>
      </Stack>
    );
  } else {
    return (
      <Stack gap={2}>
        <TaskAltIcon sx={{ fontSize: '40px' }} />
        <Typography level="h2">Done.</Typography>
        <Typography level="body2">
          Your password has been reset successfully.
          <br />
          You can now{' '}
          <Link
            fontSize="sm"
            fontWeight="lg"
            onClick={() => nav('/auth/signin')}
          >
            Sign in
          </Link>{' '}
          using your new password.
        </Typography>
      </Stack>
    );
  }
}
