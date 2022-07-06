import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Grid, Typography, Button } from "@material-ui/core";

//Shown when an error happens for API and allow retry fetching data
const ErrorScreen = ({ errorText, onRetry }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <ErrorOutlineIcon color="error" fontSize="large" />
      </Grid>
      <Grid item>
        <Typography variant="h5" color="error">
          {errorText}
        </Typography>
      </Grid>
      <Grid item>
        {onRetry && (
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ErrorScreen;
