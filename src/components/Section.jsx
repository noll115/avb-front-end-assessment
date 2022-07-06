import { Grid, Typography } from "@material-ui/core";
import React from "react";

// reusable component to keep body sections style consistent
const Section = ({ children, title, containerClass }) => {
  return (
    <Grid
      container
      component="section"
      alignItems="center"
      direction="column"
      wrap="nowrap"
      className={containerClass}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid container item direction="column">
        {children}
      </Grid>
    </Grid>
  );
};

export default Section;
