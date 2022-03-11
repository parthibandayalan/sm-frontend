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
import WrapperLayout from "./pages/WrapperLayout";

function App() {
  return (
    <div className="App">
      <Snackbar />
      <Router>
        <Routes>
          <Route path="/sm-frontend" element={<WrapperLayout />}>
            <Route path="/sm-frontend" element={<LoginPage />} />
            <Route path="/sm-frontend/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/sm-frontend/home" element={<Main />}>
                <Route path="/sm-frontend/home" element={<NewsFeed />} />
                <Route
                  path="/sm-frontend/home/addpost"
                  element={<CreatePost />}
                />
                <Route
                  path="/sm-frontend/home/user"
                  element={<NewsFeedUser />}
                />
              </Route>
            </Route>
            <Route path="/sm-frontend/error" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
