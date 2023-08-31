import { Avatar, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

type FormData = {
  email: string;
  username: string;
  password: string;
  cpassword: string;
  name: string;
  avatarUrl: string;
  _error: string;
};

import { emailRegex } from 'utils/regex';
import React, { useRef, useState } from 'react';
import omit from 'utils/omit';
import { useAppDispatch } from 'store/store';
import { signup } from 'store/appSlice';
import toURL from 'utils/toURL';

const defaultValues = {
  email: 'pds1375@gmail.com',
  username: 'pouya',
  password: 'pouya123456',
  cpassword: 'pouya123456',
  name: 'Pouya Dehghani',
  avatarUrl: '',
};

export default function SignUpForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const useFormReturn = useForm<FormData>({
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
    getValues,
    setValue,
  } = useFormReturn;
  const onSubmit = handleSubmit((data) =>
    dispatch(signup(omit(data, 'cpassword', '_error')))
      .unwrap()
      .then((e) => setValue('_error', ''))
      .catch((e) => setValue('_error', e.message))
  );
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    const url = await toURL(file);
    setValue('avatarUrl', url, {
      shouldValidate: true,
    });
  };
  const avatarPickerRef = useRef<HTMLInputElement>(null);
  return (
    <Stack gap={2}>
      <Typography variant="h2">Sign up</Typography>
      <Typography variant="body2">Let's get started! Please enter your details.</Typography>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={onSubmit}>
        <SwipeableViews index={step - 1}>
          <Stack gap={2} paddingTop={1}>
            <TextField
              label="Email"
              placeholder="Enter your email"
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

            <Button variant="outlined" fullWidth onClick={() => setStep(2)}>
              <NavigateNextIcon />
            </Button>
          </Stack>
          <Stack gap={2}>
            <input
              ref={avatarPickerRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              hidden
            />
            <Avatar
              src={getValues().avatarUrl}
              sx={{ width: 128, height: 128, alignSelf: 'center', cursor: 'pointer' }}
              onClick={() => avatarPickerRef.current?.click()}
            />
            <input type="text" hidden {...register('avatarUrl')}></input>
            <TextField
              label="Name"
              placeholder="Enter your name"
              type="text"
              {...register('name', {
                required: 'Required',
                minLength: { value: 5, message: 'Minimum 5 characters' },
                maxLength: { value: 20, message: 'Maximum 20 characters' },
                pattern: {
                  value: /^[A-Za-z0-9_ ]*$/g,
                  message: 'Only Letters, numbers, Space and underscore',
                },
              })}
              error={!!errors.username}
              color={isSubmitted && !errors.username ? 'success' : undefined}
              helperText={errors.username?.message}
            />
            <Stack direction="row">
              <Button onClick={() => setStep(1)}>
                <NavigateBeforeIcon />
              </Button>
              <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
                Sign up
              </LoadingButton>
            </Stack>
            <Typography variant="body2" color="error">
              {getValues()._error}
            </Typography>
          </Stack>
        </SwipeableViews>
      </form>
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography variant="body2">Already have an account?</Typography>
        <Link variant="body2" onClick={() => nav('/auth/signin')}>
          Sign in
        </Link>
      </Stack>
    </Stack>
  );
}
