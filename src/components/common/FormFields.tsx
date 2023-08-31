import { TextField } from '@mui/material';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export type FieldProps<T extends FieldValues = any> = React.ComponentProps<typeof TextField> & {
  form: UseFormReturn<T, any>;
};

function Username({ form, ...props }: FieldProps) {
  const {
    register,
    formState: { errors, isSubmitted },
  } = form;
  return (
    <TextField
      placeholder="Username"
      type="text"
      {...register<'username'>('username', {
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
      helperText={errors.username?.message?.toString()}
      {...props}
    />
  );
}
function Name({ form, ...props }: FieldProps) {
  const {
    register,
    formState: { errors, isSubmitted },
  } = form;
  return (
    <TextField
      placeholder="Name"
      type="text"
      {...register<'name'>('name', {
        required: 'Required',
        minLength: { value: 5, message: 'Minimum 5 characters' },
        maxLength: { value: 20, message: 'Maximum 20 characters' },
        pattern: {
          value: /^[A-Za-z0-9_ ]*$/g,
          message: 'Only Letters, numbers, Space and underscore',
        },
      })}
      error={!!errors.name}
      color={isSubmitted && !errors.name ? 'success' : undefined}
      helperText={errors.name?.message?.toString()}
      {...props}
    />
  );
}

export default {
  Username,
  Name,
};
