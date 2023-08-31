import { Link, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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
        <Typography variant="h2">Reset Password</Typography>
        <Typography variant="body2">
          Welcome back {username},<br />
          Please enter your new password
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
          <TextField
            label="Password"
            placeholder="•••••••"
            type="password"
            {...register('password', {
              required: 'Required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
              maxLength: { value: 20, message: 'Maximum 20 characters' },
            })}
            error={!!errors.password}
            color={isSubmitted && !errors.password ? 'success' : undefined}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            placeholder="•••••••"
            type="password"
            {...register('cpassword', {
              required: 'Required',
              validate: (v) => v === getValues().password || 'Passwords does not match',
            })}
            error={!!errors.cpassword}
            color={isSubmitted && !errors.cpassword ? 'success' : undefined}
            helperText={errors.cpassword?.message}
          />

          <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
            Reset Password
          </LoadingButton>
        </form>
      </Stack>
    );
  } else {
    return (
      <Stack gap={2}>
        <TaskAltIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h2">Done.</Typography>
        <Typography variant="body2">
          Your password has been reset successfully.
          <br />
          You can now{' '}
          <Link variant="body2" onClick={() => nav('/auth/signin')}>
            Sign in
          </Link>{' '}
          using your new password.
        </Typography>
      </Stack>
    );
  }
}
