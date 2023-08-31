import { IconButton, Input, Stack } from '@mui/material';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useAppDispatch } from 'store/store';
import { sendMessage, setIsEmojiPickerOpen, setMessageInputText } from 'store/appSlice';
import { useMessageInput } from 'store/selector';

export default function () {
  const { text, isEmojiPickerOpen } = useMessageInput();
  const dispatch = useAppDispatch();
  const handleSend = () => {
    dispatch(sendMessage());
    dispatch(setMessageInputText(''));
    setIsEmojiPickerOpen(false);
  };
  return (
    <>
      <Stack direction="row" gap={0.5} padding={0.5}>
        <Input
          startAdornment={
            <IconButton onClick={() => dispatch(setIsEmojiPickerOpen(!isEmojiPickerOpen))}>
              <SentimentSatisfiedAltOutlinedIcon />
            </IconButton>
          }
          sx={{ flexGrow: 1 }}
          placeholder="Message"
          onChange={(e) => dispatch(setMessageInputText(e.target.value))}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              if (e.ctrlKey) {
                dispatch(setMessageInputText(text + '\n'));
              } else {
                e.preventDefault();
                handleSend();
              }
            }
          }}
          value={text}
          multiline
        />
        <IconButton color="primary" onClick={handleSend} disabled={!text}>
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
      <EmojiPicker
        open={isEmojiPickerOpen}
        onEmojiSelect={(data) => dispatch(setMessageInputText(text + data.native))}
      />
    </>
  );
}
