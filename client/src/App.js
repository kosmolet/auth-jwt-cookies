import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
import AuthProvider from "./store/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              exact
              path="/resetpassword/:resetToken"
              component={ResetPassword}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
