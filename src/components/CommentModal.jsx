import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCommentsModal,
  getViewCommentsModalOpen,
  addComment,
} from "store/slices/view";
import {
  Button,
  Fade,
  Grid,
  Paper,
  TextField,
  Typography,
  Modal,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    padding: theme.spacing(3),
    width: "70%",
    maxWidth: 600,
  },
  formBtn: {
    marginTop: theme.spacing(1),
  },
}));

const initData = {
  name: "",
  body: "",
};

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(getViewCommentsModalOpen);

  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({});

  //reset data/error when closing modal
  const handleClose = () => {
    setErrors({});
    setData(initData);
    dispatch(closeCommentsModal());
  };

  /* 
  returns props necessary for textfield to function with component states
  also prevents having to type the same props for each textfield
  */
  const handleTextField = (field) => {
    return {
      onChange: ({ target }) => {
        const { value } = target;
        setData({ ...data, [field]: value });
      },
      value: data[field],
      error: errors[field] !== undefined,
      helperText: errors[field],
    };
  };

  //error checking if no errors then submit comment and close
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameArr = data.name.split(" ");
    let newErrors = {};
    if (nameArr.length < 2) {
      newErrors["name"] = "Requires first and last name.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(addComment(data));
      handleClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      aria-labelledby="modal-title"
    >
      <Fade in={isOpen}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          className={classes.modalContent}
        >
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h4" id="modal-title">
                Add Comment
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                {...handleTextField("name")}
                label="Full name"
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                {...handleTextField("body")}
                label="Comment"
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                endIcon={<SendIcon />}
                className={classes.formBtn}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CommentModal;
