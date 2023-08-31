import { Button, Input, Modal, Stack, TextField, Typography } from '@mui/material';
import FormFields from 'components/common/FormFields';
import { useForm } from 'react-hook-form';
import { useIsAddContactModalOpen } from 'store/selector';
import { useAppDispatch } from 'store/store';
import { hideAddContactModal, showContactListModal } from 'store/uiSlice';
import { addContact } from 'store/appSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 2,
};

interface AddContactForm {
  name: string;
  username: string;
}

function AddContact() {
  const form = useForm<AddContactForm>();
  const { handleSubmit, getValues, setValue, setError } = form;
  const isAddContactModalOpen = useIsAddContactModalOpen();
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={isAddContactModalOpen}
      onClose={() => dispatch(hideAddContactModal())}
      aria-labelledby="contact list"
      aria-describedby="list of your contacts"
    >
      <Stack sx={style} gap={1}>
        <Typography variant="h6">Add Contact</Typography>
        <FormFields.Name form={form} />
        <FormFields.Username form={form} />
        <Typography variant="body2" color="error">
          {form.formState.errors.root?.serverError?.message}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="text"
            onClick={() => {
              dispatch(hideAddContactModal());
              dispatch(showContactListModal());
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={async () => {
              handleSubmit(
                async (data) => {
                  dispatch(addContact(data))
                    .unwrap()
                    .then(() => {
                      dispatch(hideAddContactModal());
                      dispatch(showContactListModal());
                    })
                    .catch((data) => {
                      setError('root.serverError', {
                        message: data.error?.message?.toString() || 'Something went wrong',
                      });
                    });
                },
                (errors) => {
                  console.log(errors);
                }
              )();
              //dispatch(hideAddContactModal());
              //dispatch(showContactListModal());
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
export default AddContact;
