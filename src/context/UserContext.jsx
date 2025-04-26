import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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
  const [editTaskId, setEditTaskId] = useState(null);
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

  const deleteTaskId = async (id) => {
    try {
      const taskRef = doc(db, "tasks", id);
      const tasksSnap = await getDoc(taskRef);
      if (tasksSnap.exists()) {
        const taskData = tasksSnap.data();
        await addDoc(collection, "trash", taskData);
        await deleteDoc(taskRef);
        toast.success("Task moved to Trash!");
        getTasks();
      }
    } catch (error) {
      console.error("Error moving task to Trash:", error);
      toast.error("Failed to move to Trash!");
    }
  };

  const startEditTask = (task) => {
    setIsOpenModal(true);
    setEditTaskId(task.id);
    setTaskData({
      taskTitle: task.taskTitle,
      assignedTo: task.assignedTo,
      taskStatus: task.taskStatus,
      taskDate: task.taskDate,
      level: task.level,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const taskRef = doc(db, "tasks", editTaskId);
      await updateDoc(taskRef, taskData);
      getTasks();
      closeModal();
      setEditTaskId(null);
      setTaskData({
        // Clear input fields
        taskTitle: "",
        assignedTo: "",
        taskStatus: "",
        taskDate: "",
        level: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
    setLoading(false);
  };
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
        deleteTaskId,
        startEditTask,
        updateTask,
        editTaskId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const Context = () => useContext(UserContext);
