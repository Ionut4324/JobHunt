import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import JobInfo from "./pages/JobInfo";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "./redux/actions/jobActions.";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostedJobs from "./pages/PostedJobs";
import EditJob from "./pages/EditJob";
import { getAllUsers } from "./redux/actions/userActions";
import UserInfo from "./pages/UserInfo";
import Chat from "./pages/Chat";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers())
  }, []);
  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <FadeLoader color={"#001529"} />
        </div>
      )}

      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/appliedjobs" exact component={AppliedJobs} />
        <ProtectedRoute path="/postjob" exact component={PostJob} />

        <ProtectedRoute path="/profile" exact component={Profile} />
        <ProtectedRoute path="/jobs/:id" exact component={JobInfo} />

        <ProtectedRoute path="/posted" exact component={PostedJobs} />

        <ProtectedRoute path="/editjob/:id" exact component={EditJob} />
        <ProtectedRoute path="/users/:id" exact component={UserInfo} />

        <ProtectedRoute path="/chat/:id" exact component={Chat} />

        <ProtectedRoute path="/updateProfile" exact component={UpdateProfile} />

      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
}
