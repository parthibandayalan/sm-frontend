import React, { useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { LockRounded, AccountCircle } from "@material-ui/icons";
import { loginUser } from "../redux/ducks/Authentication";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  centerDiv: {
    minWidth: "900px",
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -40%)",
  },
  paperStyles: {
    minWidth: "900px",
    padding: theme.spacing(20, 20),
  },
  buttonBlock: {
    width: "90%",
    margin: "auto auto",
    display: "block",
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth.authenticated);

  useEffect(() => {
    if (auth) navigate("/home");
  }, [auth]);

  return (
    <div className={classes.centerDiv}>
      <Paper className={classes.paperStyle}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={8}>
            <img
              src={process.env.PUBLIC_URL + "/assets/login_side.svg"}
              width="100%"
              height="auto"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              alt="logo"
            />
          </Grid>
          <Grid item xs={4}>
            <LoginForm />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const initialValues = {
  username: "",
  password: "",
};

function LoginForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div style={{ width: 250 }}>
      <Grid container justify="center">
        <img
          src={process.env.PUBLIC_URL + "/assets/login_top.svg"}
          width={200}
          alt="logo"
          style={{ padding: "20px 20px 20px 20px" }}
        />
      </Grid>
      <div style={{ height: 20 }}></div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, formikHelpers) => {
          console.log("Submition Done");
          console.log(values);
          dispatch(loginUser(values));
          // errorVisible = true;
          // console.log("dispatch done outside :" + auth);
        }}
      >
        {({ values, errors, isSubmitting, isValidating }) => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Grid item>
              <Typography component="h1" variant="h6">
                Social Media App
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h6">
                Sign in
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              spacing={3}
            >
              <Form>
                <Grid item>
                  <Field
                    required
                    name="username"
                    type="string"
                    as={TextField}
                    label="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <ErrorMessage name="username" />
                </Grid>
                <Grid item>
                  <Field
                    required
                    name="password"
                    type="password"
                    as={TextField}
                    label="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRounded />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <ErrorMessage name="password" />
                </Grid>
                <div style={{ height: 20 }}></div>
                <Grid item>
                  <Box marginBottom={2}>
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
                </Grid>
                <div style={{ height: 5 }}></div>
                <Grid item>
                  <Box>
                    <Button
                      color="default"
                      type="submit"
                      onClick={() => navigate("/register")}
                      className={classes.buttonBlock}
                    >
                      Register
                    </Button>
                  </Box>
                </Grid>
                <div style={{ height: 5 }}></div>
              </Form>
              <Grid item>
                <Box>
                  <Button
                    color="default"
                    type="submit"
                    onClick={() => {
                      dispatch(
                        loginUser({
                          username: "username1",
                          password: "Password123",
                        })
                      );
                      navigate("/home");
                    }}
                    className={classes.buttonBlock}
                  >
                    Demo Login
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        )}
      </Formik>
    </div>
  );
}
