import Stack from '@mui/material/Stack';
import Left from './left/Left';
import Middle from './middle/Middle';
import useRequireUser from 'hooks/useRequireUser';
import ContactList from 'components/modal/ContactList/ContactList';
import AddContact from 'components/modal/ContactList/AddContact';

export default function Main() {
  useRequireUser();
  return (
    <>
      <ContactList />
      <AddContact />
      <Stack direction="row" spacing={0} sx={{ height: '100vh' }}>
        <Left />
        <Middle />
      </Stack>
    </>
  );
}
