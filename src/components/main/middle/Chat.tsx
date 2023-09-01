import { Avatar, IconButton, Input, LinearProgress, Stack, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import Message from './Message';
import { useActiveChatData } from 'store/selector';

import MessageInput from './MessageInput';
import { TooltipErrorBoundery } from 'components/common/Err';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export default function Chat() {
  const chatData = useActiveChatData();
  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  }, [chatData?.messages?.length]);

  if (!chatData) return <></>;
  const { loading, type, title, avatarUrl, messages } = chatData;

  return (
    <Stack height="100vh" justifyContent="flex-start">
      <LinearProgress
        value={loading ? undefined : 0}
        variant={loading ? 'indeterminate' : 'determinate'}
        sx={{ flexGrow: 0, height: '1px' }}
      />
      <Stack
        direction="row"
        sx={{
          backgroundColor: ({ palette }) => palette.background.default,
        }}
        gap={1}
      >
        <IconButton>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <IconButton sx={{ padding: 1 }}>
          <Avatar sizes="24px" src={avatarUrl} alt={title} />
        </IconButton>
        <Stack justifyContent="center" minWidth={0} flexShrink={3}>
          <Typography noWrap>{title}</Typography>
          <Typography variant="body2" noWrap>
            last seen recently
          </Typography>
        </Stack>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
      </Stack>
      <Stack sx={{ overflowY: 'scroll' }} flexGrow="1" ref={messageListRef}>
        <div style={{ flexGrow: 1 }}></div>
        {!loading &&
          messages?.map((msg) => (
            <TooltipErrorBoundery key={msg._id}>
              <Message message={msg} listRef={messageListRef} />
            </TooltipErrorBoundery>
          ))}
      </Stack>
      <MessageInput />
    </Stack>
  );
}
