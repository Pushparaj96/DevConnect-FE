import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import Signup from "./components/Signup";

function App() {
  
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/connections" element={<Connections/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
