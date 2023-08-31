import { Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import { signin } from 'store/appSlice';
import omit from 'utils/omit';

type FormData = {
  username: string;
  password: string;
  persistent: boolean;
  _error: string;
};

export default function SignInForm() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    setValue,
    getValues,
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) =>
    dispatch(signin(omit(data, 'persistent', '_error')))
      .unwrap()
      .then((e) => setValue('_error', ''))
      .catch((e) => setValue('_error', e.message))
  );
  return (
    <Stack gap={2}>
      <Typography variant="h2">Welcome back</Typography>
      <Typography variant="body2">Let's get started! Please enter your details.</Typography>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
        <TextField
          label="Username"
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
          helperText={errors.username?.message}
        />

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

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            label="Remember for 30 days"
            control={<Checkbox size="small" {...register('persistent')} />}
          ></FormControlLabel>

          <Link variant="body1" onClick={() => nav('/auth/forgot-password')}>
            Forgot password
          </Link>
        </Stack>
        <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
          Sign in
        </LoadingButton>
        <Typography variant="body2" color="error">
          {getValues()._error}
        </Typography>
      </form>
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography variant="body2">Don't have an account?</Typography>
        <Link variant="body2" onClick={() => nav('/auth/signup')}>
          Sign up
        </Link>
      </Stack>
    </Stack>
  );
}
