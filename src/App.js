import "./App.css";
import Main from "./pages/Main.jsx";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import NewsFeed from "./pages/NewsFeed";
import CreatePost from "./pages/CreatePost";
import Snackbar from "./components/CustomizedSnackBar";
import Error from "./pages/Error";
import NewsFeedUser from "./pages/NewsFeedUser";

function App() {
  return (
    <div className="App">
      <Snackbar />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Main />}>
              <Route path="/home" element={<NewsFeed />} />
              <Route path="/home/addpost" element={<CreatePost />} />
              <Route path="/home/user" element={<NewsFeedUser />} />
            </Route>
          </Route>
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
