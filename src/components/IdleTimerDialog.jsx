import React, { useState, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, refreshToken } from "../redux/ducks/Authentication";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function IdleTimerDialog() {
  const [open, setOpen] = useState(false);
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.auth.authenticated);

  const onIdle = () => {
    console.log("User is idle");
    setOpen(true);
    sessionTimeoutRef.current = setTimeout(logOut, 60 * 1000);
  };
  const handleClose = () => {
    console.log("Handle Close");
    if (isLoggedIn) {
      dispatch(refreshToken());
      clearTimeout(sessionTimeoutRef.current);
    }
  };

  const logOut = () => {
    setOpen(false);
    dispatch(logoutUser());
    clearTimeout(sessionTimeoutRef.current);
    console.log("User has been logged out");
  };
  const stayActive = () => {
    setOpen(false);
    dispatch(refreshToken());
    clearTimeout(sessionTimeoutRef.current);
    console.log("User is active");
  };

  return (
    <div>
      {isLoggedIn && (
        <IdleTimer ref={idleTimerRef} timeout={1000 * 5} onIdle={onIdle} />
      )}
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle id="alert-dialog-title">
          {"You've been idle for a while!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be logged out soon
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => logOut()} color="primary">
            Log Out
          </Button>
          <Button onClick={() => stayActive()} color="primary" autoFocus>
            Stay Active
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
