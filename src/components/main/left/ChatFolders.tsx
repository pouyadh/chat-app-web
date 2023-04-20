import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { useCallback, useRef } from 'react';

export default function ChatFolders() {
  //Make it scroll horizontally on mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }, []);
  return (
    <Tabs defaultValue={1} sx={{ backgroundColor: 'transparent' }}>
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
        <Tab value={1}>Tab A</Tab>
        <Tab value={2}>Tab B</Tab>
        <Tab value={3}>Tab C</Tab>
        <Tab value={4}>Tab D</Tab>
        <Tab value={5}>Tab E</Tab>
        <Tab value={6}>Tab F</Tab>
        <Tab value={7}>Tab G</Tab>
        <Tab value={8}>Tab H</Tab>
        <Tab value={9}>Tab I</Tab>
        <Tab value={10}>Tab J</Tab>
        <Tab value={11}>Tab K</Tab>
      </TabList>
    </Tabs>
  );
}
