import React from "react";
import {
  Paper,
  Grid,
  FormGroup,
  Typography,
  TextField,
  makeStyles,
  Link,
  Box,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { createUser } from "../services/UserServices";

const useStyles = makeStyles(theme => ({
  centerDiv: {
    minWidth: "900px",
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -40%)",
  },
  wrapDiv: {
    padding: theme.spacing(2, 2),
  },
  regPaper: {
    width: "300px",
    align: "center",
    display: "block",
    padding: theme.spacing(2, 2),
    margin: theme.spacing(8, 2),
  },
  paperStyles: {
    minWidth: "900px",
    // padding: theme.spacing(2, 0),
  },
  buttonBlock: {
    width: "90%",
    margin: "auto auto",
    display: "block",
  },
}));

const initialValues = {
  name: "",
  username: "",
  password: "",
  passwordConfirmation: "",
};

export default function Register() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.centerDiv}>
      <Paper className={classes.paperStyles}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={7}>
            <div className={classes.wrapDiv}>
              <img
                src={process.env.PUBLIC_URL + "/assets/register_side.svg"}
                width="100%"
                height="auto"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                alt="logo"
              />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className={classes.regPaper}>
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/assets/register_top.png"}
                  width={50}
                  height={50}
                  alt="logo"
                />
                <Typography variant="h4">Social Media App</Typography>
              </div>
              <div>
                <Typography variant="h6">Registration</Typography>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  name: Yup.string()
                    .required()
                    .min(6, "Name needs to be atleast 6 character long")
                    .max(50, "Name cannot be more than 50 characters long4"),
                  username: Yup.string()
                    .required("User Name is required")
                    .test(
                      "username",
                      "Username Exists already",
                      (value, context) => {
                        //console.log(UserService.checkUsernameExist(value).then((response)=> Boolean(response) ));
                        //return !( value === 'user1');
                        // let returnvalue = checkUsernameExist(value);
                        // console.log(JSON.stringify(returnvalue));
                        // return returnvalue;
                        return true;
                      }
                    )
                    .min(6, "Username must be at least 6 characters")
                    .max(50, "Username must be less 50 characters"),
                  password: Yup.string()
                    .min(8, "Password must be at least 8 characters")
                    .max(50, "Password must be less than 50 characters")
                    .matches(
                      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                    )
                    .required("Password is required"),
                  passwordConfirmation: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required"),
                })}
                onSubmit={(values, formikHelpers) => {
                  createUser(values)
                    .then(response => {
                      console.log(JSON.stringify(response));
                      // dispatch(
                      //   setSnackbar(
                      //     true,
                      //     "success",
                      //     "User Registration Successful"
                      //   )
                      // );
                      navigate("/");
                    })
                    .catch
                    // dispatch(
                    //   setSnackbar(true, "error", "User Registration Failed")
                    // )
                    ();
                }}
              >
                {({ values, errors, isSubmitting, isValidating }) => (
                  <Form>
                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          required
                          name="name"
                          type="string"
                          as={TextField}
                          label="Full Name"
                        />
                        <ErrorMessage name="name" />
                      </FormGroup>
                    </Box>
                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          required
                          name="username"
                          type="string"
                          as={TextField}
                          label="User Name"
                        />
                        <ErrorMessage name="username" />
                      </FormGroup>
                    </Box>
                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          required
                          id="password"
                          name="password"
                          label="Password"
                          as={TextField}
                          type="password"
                          autoComplete="current-password"
                        />
                        <ErrorMessage name="password" />
                      </FormGroup>
                    </Box>
                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          required
                          id="passwordConfirmation"
                          name="passwordConfirmation"
                          label="Confirm Password"
                          as={TextField}
                          type="password"
                          autoComplete="current-password"
                        />
                        <ErrorMessage name="passwordConfirmation" />
                      </FormGroup>
                    </Box>
                    <div />
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
                    </Box>
                    <Box marginBottom={1}>
                      <Button
                        variant="contained"
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
              <Typography variant="subtitle1">
                Already Registered?{" "}
                <Link onClick={() => navigate("/")}>Login</Link>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
