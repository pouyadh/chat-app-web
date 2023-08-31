import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { useFolders, useSelectedFolderId } from 'store/selector';
import { setSelectedFolderId } from 'store/appSlice';

export default function ChatFolders() {
  const folders = useFolders();
  const selectedFolderId = useSelectedFolderId();
  const dispatch = useAppDispatch();

  //Make it scroll horizontally on mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }, []);
  return (
    <Tabs
      variant="scrollable"
      value={selectedFolderId}
      onChange={(_, v) => {
        if (!v) return;
        dispatch(setSelectedFolderId(v));
      }}
      sx={{ backgroundColor: 'transparent' }}
    >
      <Tab value="" label="All"></Tab>
      {folders && folders.map(({ id, name }) => <Tab key={id} value={id} label={name} />)}
    </Tabs>
  );
}
