import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import Body from "./Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {


  return (
    <>
      

    <Provider store={appStore}>
     <BrowserRouter basename="/">
        <Routes >
          <Route path="/" element={<Body />} >  
            <Route path="/login" element={<Login />} /> 
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />

          </Route>
        </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
