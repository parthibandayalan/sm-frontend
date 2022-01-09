import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import CreatePost from "../components/CreatePost";
import { getAllPost } from "../services/PostService";
import { useEffect } from "react";
import { PostWithOutImage } from "../components/Post";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetTrigger } from "../redux/ducks/Trigger";

export default function NewsFeed() {
  const [postList, setPostLists] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reload = useSelector(state => state.trigger.boolTrigger);
  const username = useSelector(state => state.auth.username);

  useEffect(() => {
    getAllPost()
      .then(res => setPostLists(res))
      .catch(res => {
        console.log(res);
        navigate("/error");
      });
    dispatch(resetTrigger());
  }, [postList.length, reload]);

  return (
    <div>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <div />
        </Grid>
        <Grid item>
          <CreatePost />
        </Grid>
        {postList.map((eachItem, key) => (
          <Grid item key={key}>
            {<PostWithOutImage post={eachItem} currentUsername={username} />}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
