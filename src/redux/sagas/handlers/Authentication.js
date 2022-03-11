import { call, put } from "redux-saga/effects";
import {
  authenticationUser,
  cancelToken,
  refreshToken,
} from "../requests/Authentication";
import { setAuthenticated } from "../../ducks/Authentication";
import { setSnackbar } from "../../ducks/Snackbar";

export function* handleLoginUser(action) {
  try {
    console.log("Handle Login User");
    console.log("login user action called");
    const response = yield call(authenticationUser, action.payload);

    if (response.status !== 200) throw Error("Login Failed");

    yield put(
      setAuthenticated(true, response.data.username, response.data.name)
    );
    yield put(setSnackbar(true, "success", "Log In Successful"));
  } catch (e) {
    yield put(setAuthenticated(false));
    yield put(setSnackbar(true, "error", "Log In Failed"));
    console.log(e);
  }
}

export function* handleRefreshToken(action) {
  let authentication = false;
  console.log("Handle refresh token");
  try {
    console.log("handler caught");
    const response = yield call(refreshToken);
    if (response.status === 200) {
      authentication = true;
    }
    yield put(
      setAuthenticated(
        authentication,
        response.data.username,
        response.data.name
      )
    );
  } catch (error) {
    yield put(setAuthenticated(authentication, null, null));
  }
}

export function* handleLogoutUser(action) {
  try {
    console.log("Handle Log Out ");
    yield put(setAuthenticated(false, null, null));
    const response = yield call(cancelToken);
    if (response.status === 200) throw Error("Log Out Failed");
    yield put(setSnackbar(true, "success", "Log Out Successful"));
  } catch (error) {
    console.log();
    yield put(setSnackbar(true, "error", "Log Out Failed"));
  }
}
