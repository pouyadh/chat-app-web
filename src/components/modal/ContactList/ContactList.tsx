import {
  Avatar,
  Button,
  Input,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import { setActiveChat } from 'store/appSlice';
import { useContacts, useIsContactListModalOpen, useUserPublicProfile } from 'store/selector';
import { useAppDispatch } from 'store/store';
import { hideContactListModal, showAddContactModal } from 'store/uiSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 2,
};

function ContactList() {
  const isContactListModalOpen = useIsContactListModalOpen();
  const contacts = useContacts();
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={isContactListModalOpen}
      onClose={() => dispatch(hideContactListModal())}
      aria-labelledby="contact list"
      aria-describedby="list of your contacts"
    >
      <Stack sx={style} gap={1}>
        <Typography variant="h6">Contacts</Typography>
        <Input placeholder="Search" autoFocus fullWidth></Input>
        <List sx={{ maxHeight: '60vh', overflowY: 'scroll' }}>
          {contacts.map((c) => (
            <ListItemButton
              key={c._id}
              onClick={() => {
                dispatch(hideContactListModal());
                dispatch(setActiveChat({ type: 'user', id: c._id }));
              }}
            >
              <ListItemAvatar>
                <Avatar src={c.avatarUrl} />
              </ListItemAvatar>
              <ListItemText primary={c.name} secondary="last seen recently" />
            </ListItemButton>
          ))}
        </List>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="text"
            onClick={() => {
              dispatch(hideContactListModal());
              dispatch(showAddContactModal());
            }}
          >
            Add Contact
          </Button>
          <Button variant="text" onClick={() => dispatch(hideContactListModal())}>
            Close
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
export default ContactList;
