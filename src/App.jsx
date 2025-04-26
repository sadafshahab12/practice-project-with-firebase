import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./register/Login";
import Signup from "./register/Signup";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* protected route  */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
