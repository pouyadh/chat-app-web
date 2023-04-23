import { Box, Stack, Typography } from '@mui/joy';

import AvTimerIcon from '@mui/icons-material/AvTimer';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { useMemo } from 'react';

type MessageProps = {
  message: ChatMessage;
  children?: React.ReactNode;
};

const userId = 43;

export default function Message({ message }: MessageProps) {
  const { id, senderId, createdAt, outgoingStatus, text } = message;
  const isOwn = senderId === userId;
  return (
    <Stack
      direction="row"
      justifyContent={isOwn ? 'flex-start' : 'flex-end'}
      sx={{
        padding: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: ({ palette }) =>
            isOwn ? palette.background.body : palette.primary[700],
          borderRadius: 10,
        }}
        paddingY={0.3}
        paddingX={0.8}
      >
        {text && renderText(text)}
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Typography level="body3" lineHeight={1}>
            {renderMessageTime(createdAt)}{' '}
            {!isOwn && renderOutGoingMessageStatus(outgoingStatus)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

const renderOutGoingMessageStatus = (status: OutgoingMessageStatus) => {
  switch (status) {
    case 'sending':
      return <AvTimerIcon sx={{ verticalAlign: 'text-bottom' }} />;
    case 'sent':
      return <DoneIcon sx={{ verticalAlign: 'text-bottom' }} />;
    case 'received':
      return <DoneAllIcon sx={{ verticalAlign: 'text-bottom' }} />;
    case 'seen':
      return (
        <DoneAllIcon color="primary" sx={{ verticalAlign: 'text-bottom' }} />
      );
    case 'failed':
      return (
        <ErrorOutlineOutlinedIcon
          // ts error is a bug in @mui/joy library so igonre it
          // @ts-ignore
          color="danger"
          sx={{
            verticalAlign: 'text-bottom',
          }}
        />
      );
  }
  return <></>;
};

const renderMessageTime = (timestamp: number) => {
  const strTime = useMemo(() => {
    const d = new Date(timestamp);
    return `${d.getHours()}:${d.getMinutes()}`;
  }, [timestamp]);
  return <>{strTime}</>;
};

const renderText = (text: string) => (
  <Typography lineHeight={1.2}>{text}</Typography>
);
