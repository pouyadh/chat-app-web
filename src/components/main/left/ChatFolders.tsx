import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { useCallback } from 'react';

type ChatFolderProps = {
  chatFolders: ChatFolder[];
};

export default function ChatFolders(props: ChatFolderProps) {
  //Make it scroll horizontally on mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }, []);
  return (
    <Tabs defaultValue="all" sx={{ backgroundColor: 'transparent' }}>
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
        {props.chatFolders.map((chatFolder) => (
          <Tab key={chatFolder.id} value={chatFolder.id}>
            {chatFolder.name}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
