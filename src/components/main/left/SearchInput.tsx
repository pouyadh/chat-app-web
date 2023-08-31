import { IconButton, Input } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { KeyboardEventHandler, useCallback, useRef, useState } from 'react';

export default function SearchInput() {
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelSearch = useCallback(() => {
    setSearch('');
    inputRef.current?.blur();
  }, [setSearch, inputRef.current]);
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape') cancelSearch();
  };
  return (
    <Input
      placeholder="Search"
      startAdornment={<SearchOutlinedIcon />}
      endAdornment={
        search ? (
          <IconButton color="default" onClick={() => cancelSearch()}>
            <CloseOutlinedIcon />
          </IconButton>
        ) : undefined
      }
      sx={{ flexGrow: 1 }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  );
}
