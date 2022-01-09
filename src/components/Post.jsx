import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteById } from "../services/PostService";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../redux/ducks/Snackbar";
import { setTrigger } from "../redux/ducks/Trigger";
import { Navigate, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  cardStyle: {
    width: "600px",
  },
  cardActions: {
    display: "flex",
    alignItem: "right",
  },
}));

export function PostWithImage(props) {
  const classes = useStyles();
  const { username, name, message } = props.post;

  return (
    <Card className={classes.cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/login_side.svg"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "left" }}
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ textAlign: "left" }}
          >
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export function PostWithOutImage(props) {
  const classes = useStyles();
  const { _id, username, name, message, title } = props.post;
  const currentUsername = props.currentUsername;
  const dispatch = useDispatch();

  return (
    <Card className={classes.cardStyle}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ textAlign: "left" }}
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            style={{ textAlign: "left" }}
          >
            <Link to="/home/user" state={{ username }}>
              {username}
            </Link>
          </Typography>

          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "left" }}
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          justifyContent: "flex-end",
        }}
      >
        {currentUsername === username && (
          <IconButton aria-label="delete" size="small">
            <DeleteIcon
              fontSize="small"
              onClick={() => {
                deleteById(_id.valueOf())
                  .then(() => {
                    dispatch(setSnackbar(true, "success", "Post Deleted"));
                    dispatch(setTrigger());
                  })
                  .catch(() => {
                    dispatch(setSnackbar(true, "error", "Deletion Failed"));
                  });
              }}
            />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
