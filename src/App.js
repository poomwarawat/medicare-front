import "./App.css";
import { Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignUpDoctor from "./pages/SignUpDoctor";
import Home from "./pages/Home";
import PreInformation from "./pages/PreInformation";
import DoctorHome from "./pages/Doctor";
import WaitingQueue from "./pages/WaitingQueue";
import WaitingRoom from "./pages/WaitingRoom";
import Chat from "./pages/Chat";
import Streaming from "./pages/Streaming";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-up-doctor" component={SignUpDoctor} />
        <Route path="/home" component={Home} />
        <Route path="/pre-information" component={PreInformation} />
        <Route path="/doctor" component={DoctorHome} exact />
        <Route path="/doctor/waiting-queue" component={WaitingQueue} />
        <Route path="/waiting-room/:roomID" component={WaitingRoom} />
        <Route path="/chat/:chatroomID" component={Chat} />
        <Route path="/streaming/:roomID" component={Streaming} />
      </Switch>
    </div>
  );
}

export default App;
