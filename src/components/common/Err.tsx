import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useRouteError } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Err() {
  let error = useRouteError();
  if (error instanceof TypeError) {
    return (
      <Container>
        <Paper sx={{ padding: 4, margin: 4 }}>
          <Typography variant="h3">OOPS! 🥴</Typography>
          <Typography variant="subtitle2" color="primary">
            {error.name}: {error.message}
          </Typography>
          <pre style={{ overflowX: 'scroll', paddingBottom: 10, fontSize: 14 }}>{error.stack}</pre>
        </Paper>
      </Container>
    );
  } else {
    <Container>
      <Paper sx={{ padding: 4, margin: 4 }}>
        <Typography variant="h3">OOPS! 🥴</Typography>
        <Typography variant="subtitle2" color="primary">
          {error?.toString() || 'Something went wrong'}
        </Typography>
        <pre style={{ overflowX: 'scroll', paddingBottom: 10, fontSize: 14 }}>
          {JSON.stringify(error)}
        </pre>
      </Paper>
    </Container>;
  }
}
export default Err;

export class TooltipErrorBoundery extends React.Component<
  React.PropsWithChildren,
  { error: Error | null; errorInfo: React.ErrorInfo | null }
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }
  render(): React.ReactNode {
    if (this.state.error) {
      const { error, errorInfo } = this.state;
      return (
        <Paper sx={{ margin: 2, padding: 2 }}>
          <Typography variant="subtitle2" color="primary">
            {error.name}: {error.message}
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Stack</AccordionSummary>
            <AccordionDetails>
              <pre style={{ overflowX: 'scroll', paddingBottom: 10, fontSize: 14 }}>
                {error.stack}
              </pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Component Stack</AccordionSummary>
            <AccordionDetails>
              <pre style={{ overflowX: 'scroll', paddingBottom: 10, fontSize: 14 }}>
                {errorInfo?.componentStack}
              </pre>
            </AccordionDetails>
          </Accordion>
        </Paper>
      );
    } else {
      return this.props.children;
    }
  }
}
