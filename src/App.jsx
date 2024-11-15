import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
