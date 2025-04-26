import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/userContext";
const Header = () => {
  const { userInfo, loading } = Context();
  const navigate = useNavigate();
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
      <div className="justify-items-end">
        {loading ? (
          <p>Loading...</p> // jab tak auth response nahi deta
        ) : userInfo ? (
          <div className="flex  items-center gap-6">
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
