import {
  Avatar,
  IconButton,
  Input,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/joy';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SendIcon from '@mui/icons-material/Send';

import Message from './Message';

import CHAT_MESSAGES from 'mock-data/ChatMessage.json';
import React, { useState } from 'react';

import data from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';
import './Chat.css';

export default function Chat() {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const chatMessages = CHAT_MESSAGES as ChatMessage[];
  const loading = false;
  return (
    <Stack height="100vh" justifyContent="flex-start">
      <LinearProgress
        variant="plain"
        thickness={3}
        value={loading ? undefined : 0}
        sx={{ flexGrow: 0 }}
      />
      <Stack
        direction="row"
        sx={{
          backgroundColor: ({ palette }) => palette.background.body,
        }}
        gap={1}
      >
        <IconButton variant="plain" color="neutral">
          <ArrowBackOutlinedIcon />
        </IconButton>
        <IconButton variant="plain" color="neutral" sx={{ padding: 1 }}>
          <Avatar size="lg" />
        </IconButton>
        <Stack justifyContent="center" minWidth={0} flexShrink={3}>
          <Typography noWrap>Name</Typography>
          <Typography level="body2" noWrap>
            last seen recently
          </Typography>
        </Stack>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton variant="plain" color="neutral">
          <SearchOutlinedIcon />
        </IconButton>
      </Stack>
      <Stack>
        {chatMessages.map((chatMessage) => (
          <Message key={chatMessage.id} message={chatMessage} />
        ))}
      </Stack>
      <div style={{ flexGrow: 1 }}></div>
      <Stack direction="row" gap={0.5} padding={0.5}>
        <Input
          startDecorator={
            <IconButton
              variant="plain"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <SentimentSatisfiedAltOutlinedIcon />
            </IconButton>
          }
          sx={{ flexGrow: 1 }}
          placeholder="Message"
        />
        <IconButton variant="solid" color="primary">
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
      <div>
        {isEmojiPickerOpen && (
          <EmojiPicker
            theme="auto"
            data={data}
            navPosition="none"
            previewPosition="none"
            searchPosition="none"
            dynamicWidth={true}
          />
        )}
      </div>
    </Stack>
  );
}
