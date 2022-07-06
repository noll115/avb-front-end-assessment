import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  getCommentsStatus,
  LoadingStatus,
  getError,
} from "store/slices/view";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { CommentsList, Section, TopCommentors, ErrorScreen } from "components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  commentsSection: {
    marginTop: theme.spacing(3),
  },
}));

//Main body of the app which has multiple states based on loading status of comments
const Body = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const loadingStatus = useSelector(getCommentsStatus);

  const errorText = useSelector(getError);
  const isLoading = loadingStatus === LoadingStatus.pending;
  const hasFailed = loadingStatus === LoadingStatus.failed;

  //memoize func to not set off useEffect every render and can pass to child component
  const getData = useCallback(() => dispatch(fetchComments()), [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  let content = (
    <>
      <Section title="Top Commentors">
        <TopCommentors />
      </Section>
      <Section title="Comments" containerClass={styles.commentsSection}>
        <CommentsList />
      </Section>
    </>
  );

  if (isLoading) {
    //API is pending state
    content = <CircularProgress size={70} />;
  }
  if (hasFailed) {
    //API has failed state
    content = <ErrorScreen errorText={errorText} onRetry={getData} />;
  }

  //API fetched successfully so show comments
  return (
    <Grid container justify="center" className={styles.root}>
      {content}
    </Grid>
  );
};

export default Body;
