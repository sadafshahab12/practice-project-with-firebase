import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import SideBar from "../componenets/ui/SideBar";
import Header from "../componenets/ui/Header";
const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1 bg-gray-100 p-4">
        <SideBar />
      </div>
      <div className="col-span-4 p-4">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
