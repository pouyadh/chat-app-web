import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { selectChatFolders, selectSelectedFolderId, setSelectFolderId } from 'store/mainSlice';

export default function ChatFolders() {
  const chatFolders = useAppSelector(selectChatFolders);
  const selectedFolderId = useAppSelector(selectSelectedFolderId);
  const dispatch = useAppDispatch();

  //Make it scroll horizontally on mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }, []);
  return (
    <Tabs
      value={selectedFolderId || 'all'}
      onChange={(_, v) => {
        if (!v) return;
        dispatch(setSelectFolderId(v === 'all' ? null : +v));
      }}
      sx={{ backgroundColor: 'transparent' }}
    >
      <TabList
        sx={{
          borderRadius: 0,
          backgroundColor: 'transparent',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        onWheel={handleWheel}
      >
        <Tab value="all">All</Tab>
        {chatFolders &&
          chatFolders.map((chatFolder) => (
            <Tab key={chatFolder.id} value={chatFolder.id}>
              {chatFolder.name}
            </Tab>
          ))}
      </TabList>
    </Tabs>
  );
}
