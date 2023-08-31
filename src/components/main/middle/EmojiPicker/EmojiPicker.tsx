import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './EmojiPicker.css';

export type EmojiPickerProps = {
  open: boolean;
  onEmojiSelect: (emoji: {
    id: string;
    keywords: string[];
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
  }) => any;
};

export default function (props: EmojiPickerProps) {
  return (
    <div>
      {props.open && (
        <EmojiPicker
          theme="auto"
          data={data}
          navPosition="none"
          previewPosition="none"
          searchPosition="none"
          dynamicWidth={true}
          onEmojiSelect={props.onEmojiSelect}
        />
      )}
    </div>
  );
}
