import {
  Avatar,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/joy';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Chat() {
  const loading = false;
  return (
    <Stack>
      <LinearProgress
        variant="plain"
        thickness={3}
        value={loading ? undefined : 0}
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
    </Stack>
  );
}
