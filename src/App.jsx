import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./componenets/Home";
import Login from "./register/Login";
import Signup from "./register/Signup";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <ToastContainer />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
