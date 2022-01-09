import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Outlet } from "react-router";
import IdleTimerDialog from "../components/IdleTimerDialog";
import { logoutUser } from "../redux/ducks/Authentication";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Main() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(logoutUser());
    handleClose();
    navigate("/");
  };

  const auth = useSelector(state => state.auth.authenticated);

  useEffect(() => {
    console.log("Auth : " + auth);
    if (!auth) navigate("/");
  }, [auth]);

  return (
    <>
      <IdleTimerDialog />
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Grid container direction="column" justifyContent="center">
                  <Grid item>
                    {" "}
                    <Typography variant="h6">Social Media App</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" justifyContent="center">
                  <Grid item>
                    {" "}
                    <Typography variant="h6">Posts Feed</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={logout}>Log Out</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={0} md={3}>
            <div />
          </Grid>
          <Grid item xs={12} md={6}>
            <Outlet />
          </Grid>
          <Grid item xs={0} md={3}>
            <div />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
