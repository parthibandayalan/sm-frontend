import {
  handleLoginUser,
  handleLogoutUser,
  handleRefreshToken,
} from "./handlers/Authentication";
import {
  LOGIN_USER,
  REFRESH_TOKEN,
  LOGOUT_USER,
} from "../ducks/Authentication";
import { takeLatest } from "redux-saga/effects";

export function* watcherSaga() {
  yield takeLatest(LOGIN_USER, handleLoginUser);
  yield takeLatest(LOGOUT_USER, handleLogoutUser);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
}
