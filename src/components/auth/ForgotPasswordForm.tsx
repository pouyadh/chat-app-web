import { Link, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { emailRegex } from 'utils/regex';

import EmailIcon from '@mui/icons-material/Email';

type FormData = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [isLinkSent, setIsLinkSent] = useState<boolean>(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => new Promise((res) => setTimeout(res, 1000)));
  if (!isLinkSent) {
    return (
      <Stack gap={2}>
        <Typography variant="h2">Forgot Password</Typography>
        <Typography variant="body2">
          If you do not have an account,{' '}
          <Link fontSize="sm" fontWeight="lg" onClick={() => nav('/auth/signup')}>
            Click here
          </Link>{' '}
          to set up a new account.
          <br />
          Type your email address in the field below to receive your password reset link by e-mail
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
          <TextField
            label="Email"
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
            helperText={errors.email?.message}
          />
          <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
            Send me the link
          </LoadingButton>
        </form>
        <Stack direction="row" gap={1} justifyContent="center">
          <Typography variant="body2">Don't have an account?</Typography>
          <Link fontSize="sm" fontWeight="lg" onClick={() => nav('/auth/signup')}>
            Sign up
          </Link>
        </Stack>
        <Stack direction="row" gap={1} justifyContent="center">
          <Typography variant="body2">Remember your password?</Typography>
          <Link fontSize="sm" fontWeight="lg" onClick={() => nav('/auth/signin')}>
            Sign in
          </Link>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack gap={2}>
        <EmailIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h2">Check your inbox</Typography>
        <Typography variant="body2">
          We have just sent your password reset info to your email.
          <br />
          Please check your inbox and click on the link to reset your password.
          <br />
          If you can't find it, please check your Spam.
        </Typography>
      </Stack>
    );
  }
}
