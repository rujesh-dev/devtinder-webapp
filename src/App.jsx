import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Body from "./Body";

function App() {


  return (
    <>
      


     <Router >
        <Routes >
          <Route path="/" element={<Body />} /> 
          
        </Routes>
     </Router>
    </>
  )
}

export default App
