import {
  Avatar,
  Fab,
  Fade,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, {
  useState,
  useCallback,
  forwardRef,
  useMemo,
  useRef,
  useEffect,
} from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useSelector } from "react-redux";
import { getComments } from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  comment: {
    padding: theme.spacing(2),
    width: 800,
    minHeight: 100,
  },
  userName: {
    fontWeight: 700,
  },
  jumpBackBtn: {
    position: "fixed",
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
}));

/*
  Displays actual comment
  Not its own file due to only being depended on by <CommentList/>
  Memoized to save on performance and not have to rerender each comment 
  in list if it is the same comment.
  When adding a comment to 500+ comments is ~100ms when memoized ~7ms
 */
const Comment = React.memo(
  forwardRef(({ comment }, ref) => {
    const styles = useStyles();

    const { name, body } = comment;
    const nameStr = name.split(" ");
    const initals =
      nameStr[0].charAt(0) + nameStr[nameStr.length - 1].charAt(0);

    return (
      <Grid component="li" container item innerRef={ref} justify="center">
        <Paper className={styles.comment} elevation={3}>
          <Grid container wrap="nowrap" spacing={1}>
            <Grid item>
              <Avatar>{initals.toUpperCase()}</Avatar>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className={styles.userName}
                >
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{body}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }),
  (prevProps, newProps) => {
    return prevProps.id === newProps.id;
  }
);

//created intersection observer hook since it is used twice in <CommentList/>
const useIntersectionObserver = (intersectionCallback) => {
  //to prevent recreating a new IntersectionObserver on every render
  const observerRef = useRef(new IntersectionObserver(intersectionCallback));

  //useCallback instead of useState and storing node to prevent another render on element assignment
  const setElem = useCallback((newElem) => {
    if (newElem) {
      let observer = observerRef.current;
      observer.disconnect();
      observer.observe(newElem);
    }
  }, []);

  //when component unmounts stop observing
  useEffect(() => {
    let observer = observerRef.current;
    return () => observer.disconnect();
  }, []);

  return setElem;
};

const commentPageSize = 10;

//Component to display all comments in a list
const CommentsList = () => {
  const styles = useStyles();
  const comments = useSelector(getComments);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);
  // memoized to prevent recreating a large array when showScrollToTopBtn changes state
  let shownComments = useMemo(
    () => comments.slice(0, commentPageSize * currentPage),
    [comments, currentPage]
  );

  /*
  When the last comment appears on screen append next commentPageSize comments
  as if infinite scrolling.
  This is so we don't have to render all 500+ comments immediately
  */
  const newPageCommentIndex = currentPage * commentPageSize - 1;
  const setNewPageElem = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setCurrentPage((prev) => prev + 1);
    }
  });

  /*
  Observer when to show 'scroll to top' button when far down the list
  which is when the first comment goes off screen
  */
  const setFirstCommentElem = useIntersectionObserver(([entry]) =>
    setShowScrollToTopBtn(!entry.isIntersecting)
  );

  return (
    <>
      <Grid
        component="ul"
        container
        direction="column"
        spacing={2}
        wrap="nowrap"
      >
        {shownComments.map((comment, i) => {
          let refFunc;
          const isNewPageComment = newPageCommentIndex === i;
          const isFirstComment = i === 0;
          if (isFirstComment) {
            refFunc = setFirstCommentElem;
          } else if (isNewPageComment) {
            refFunc = setNewPageElem;
          }
          return <Comment key={comment.id} comment={comment} ref={refFunc} />;
        })}
      </Grid>
      <Fade in={showScrollToTopBtn}>
        <Fab
          className={styles.jumpBackBtn}
          onClick={() => {
            setShowScrollToTopBtn(false);
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Fade>
    </>
  );
};

export default CommentsList;
