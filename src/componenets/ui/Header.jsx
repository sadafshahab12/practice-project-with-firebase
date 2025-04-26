import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        } else {
          console.log(`no user`);
        }
      } else {
        console.log(`no user logged in.`);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };
  return (
    <div className="grid grid-cols-2 items-center px-10 py-4">
      <div>
        <input
          type="text"
          className="input w-full"
          placeholder="Search Task...."
        />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p> // jab tak auth response nahi deta
        ) : userInfo ? (
          <div className="flex justify-end items-center gap-6">
            <p>{userInfo.firstName}</p>
            <button className="button w-auto" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <p>No User</p> // login nahi to No User
        )}
      </div>
    </div>
  );
};

export default Header;
