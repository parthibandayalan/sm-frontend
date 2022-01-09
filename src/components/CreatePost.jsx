import React from "react";
import {
  DialogTitle,
  DialogContent,
  FormGroup,
  TextField,
  Box,
  Button,
  Dialog,
} from "@mui/material";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../services/PostService";
import { setSnackbar } from "../redux/ducks/Snackbar";
import { setTrigger } from "../redux/ducks/Trigger";

const initialValues = {
  title: "",
  message: "",
};

const useStyles = makeStyles(theme => ({
  buttonBlock: {
    margin: "10px",
    display: "inline-block",
  },
}));

export default function CreatePost() {
  const username = useSelector(state => state.auth.username);

  const classes = useStyles();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .required("Title is required")
                .min(6, "Title Needs to be atleast 6 characters long")
                .max(50, "Title cannot be more than 50 characters long"),
              message: Yup.string()
                .required("Message is required")
                .min(3, "Message should be minimum 3 characters")
                .max(255, "Message cannot be more than 255 characters long"),
            })}
            onSubmit={(values, formikHelpers) => {
              createPost({
                username: username,
                title: values.title,
                message: values.message,
              })
                .then(response => {
                  dispatch(setSnackbar(true, "success", "New Post Created"));
                  dispatch(setTrigger());
                })
                .catch(
                  dispatch(setSnackbar(true, "error", "Post Creation Failed"))
                );
              setOpen(false);
              console.log("Message submitted");
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      name="title"
                      type="string"
                      as={TextField}
                      label="Title"
                    />
                    <ErrorMessage name="title" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      name="message"
                      type="string"
                      as={TextField}
                      multiline
                      rows={4}
                      label="Message"
                    />
                    <ErrorMessage name="message" />
                  </FormGroup>
                </Box>
                <Box marginBottom={1}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting || isValidating}
                    className={classes.buttonBlock}
                  >
                    Submit
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    type="reset"
                    disabled={isSubmitting || isValidating}
                    className={classes.buttonBlock}
                  >
                    Reset
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
