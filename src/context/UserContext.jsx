import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState({
    taskTitle: "",
    assignedTo: "",
    level: "",
    taskStatus: "",
    taskDate: "",
  });
  const [taskList, setTaskList] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), taskData);
      setTaskData({
        taskTitle: "",
        assignedTo: "",
        taskStatus: "",
        taskDate: "",
        level: "",
      });
      getTasks(); //Refresh list
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setLoading(false);
    closeModal();
  };
  //Get all the task function
  const getTasks = async () => {
    const querySnapShot = await getDocs(collection(db, "tasks"));
    const tasks = [];
    querySnapShot.forEach((task) => {
      tasks.push({ id: task.id, ...task.data() });
    });
    setTaskList(tasks);
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <UserContext.Provider
      value={{
        userInfo,
        loading,
        taskData,
        handleOnChange,
        isOpenModal,
        openModal,
        closeModal,
        taskList,
        createTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const Context = () => useContext(UserContext);
