import React, { useState, useCallback } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { PostWithOutImage } from "../components/Post";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetTrigger } from "../redux/ducks/Trigger";
import { useLocation } from "react-router-dom";
import { getPostsByUsername } from "../services/PostService";

export default function NewsFeedUser(props) {
  const [postList, setPostLists] = useState([]);

  const navigate = useNavigate();
  const stableNavigate = useCallback(navigate, [navigate]);

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, [dispatch]);
  const location = useLocation();

  const reload = useSelector(state => state.trigger.boolTrigger);
  const username = useSelector(state => state.auth.username);
  const name = useSelector(state => state.auth.name);

  useEffect(() => {
    getPostsByUsername(location.state.username)
      .then(res => setPostLists(res))
      .catch(res => {
        console.log(res);
        stableNavigate("/error");
      });
    stableDispatch(resetTrigger());
  }, [
    postList.length,
    reload,
    stableDispatch,
    stableNavigate,
    location.state.username,
  ]);

  return (
    <div>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <div />
        </Grid>
        <Grid item>
          <div />
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom component="div">
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <div />
        </Grid>
        <Grid item>
          <div />
        </Grid>
        {postList.map((eachItem, key) => (
          <Grid item key={key}>
            {<PostWithOutImage post={eachItem} currentUsername={username} />}
          </Grid>
        ))}
        <Grid item>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
