import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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
  return (
    <div className="grid grid-cols-3 items-center">
      <div className=" flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
          alt="task"
          className="w-10 h-10"
        />
        <h1>Todo</h1>
      </div>
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
            <button className="button w-auto">Logout</button>
          </div>
        ) : (
          <p>No User</p> // login nahi to No User
        )}
      </div>
    </div>
  );
};

export default Header;
