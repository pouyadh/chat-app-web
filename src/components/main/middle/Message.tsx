import { Box, Stack, SxProps, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useMemo } from 'react';
import { IUser, MessageStatus } from 'api/types';
import { useContent, useUserData } from 'store/selector';
import ReactJson from 'react-json-view';

type MessageProps = {
  message: IUser['privateChats'][number]['messages'][number];
  children?: React.ReactNode;
};

export default function Message({ message }: MessageProps) {
  const { sender: senderId, _id: messageId, status, content } = message;
  const userId = useUserData()?._id;
  const contentData = useContent(content);
  const isOwn = senderId === userId;
  return (
    <>
      {/* <ReactJson
        src={{
          message,
          contentData,
          isOwn,
        }}
        displayDataTypes={false}
        name="msg"
        theme="google"
        collapsed={true}
      /> */}

      <Stack
        direction="row"
        justifyContent={isOwn ? 'flex-end' : 'flex-start'}
        sx={{
          padding: 1,
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: ({ palette }) =>
                isOwn ? palette.primary.dark : palette.primary.contrastText,
              borderRadius: 1.5,
            }}
            paddingY={0.3}
            paddingX={0.8}
          >
            {contentData?.text && renderText(contentData.text)}
          </Box>
          <Stack
            direction="row"
            justifyContent={isOwn ? 'flex-end' : 'flex-start'}
            alignItems="center"
          >
            <Typography variant="caption" lineHeight={1} marginTop={0.3}>
              {message.sentAt && renderMessageTime(message.sentAt)}{' '}
              {isOwn && renderOutGoingMessageStatus(status)}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

const renderOutGoingMessageStatus = (status: MessageStatus) => {
  const commonSx: SxProps = { verticalAlign: 'text-bottom', fontSize: 'inherit' };
  switch (status) {
    // case 'sending':
    //   return <AvTimerIcon sx={{ verticalAlign: 'text-bottom' }} />;
    case 'sent':
      return <DoneIcon sx={commonSx} />;
    case 'delivered':
      return <DoneAllIcon sx={commonSx} />;
    case 'seen':
      return <DoneAllIcon color="primary" sx={commonSx} />;
    // case 'failed':
    //   return (
    //     <ErrorOutlineOutlinedIcon
    //       // ts error is a bug in @mui/material library so igonre it
    //       // @ts-ignore
    //       color="danger"
    //       sx={{
    //         verticalAlign: 'text-bottom',
    //       }}
    //     />
    //   );
  }
  return <></>;
};

const renderMessageTime = (timestamp: string) => {
  const strTime = useMemo(() => {
    const d = new Date(timestamp);
    return `${d.getHours()}:${d.getMinutes()}`;
  }, [timestamp]);
  return <>{strTime}</>;
};

const renderText = (text: string) => <Typography lineHeight={1.2}>{text}</Typography>;
