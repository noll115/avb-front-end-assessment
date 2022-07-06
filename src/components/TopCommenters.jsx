import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getTopCommentors } from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  topCommentor: {
    padding: theme.spacing(3),
    width: 170,
    height: 150,
  },
  //name cut off when it is too long
  name: {
    overflow: "hidden",
    width: "100%",
  },
}));

// display top 3 commentors from most to least
const TopCommentors = () => {
  const styles = useStyles();
  const topCommentors = useSelector(getTopCommentors);

  return (
    <Grid container justify="center" spacing={3}>
      {topCommentors.map(([userName, num]) => {
        const nameArray = userName.split(" ");
        const initials =
          nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);

        return (
          <Grid item key={userName}>
            <Paper className={styles.topCommentor} elevation={3}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Avatar>{initials.toUpperCase()}</Avatar>
                </Grid>
                <Grid item className={styles.name}>
                  <Typography align="center" noWrap>
                    {userName}
                  </Typography>
                </Grid>
                <Grid item>
                  {`${num} ${num === 1 ? "Comment" : "Comments"}`}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCommentors;
