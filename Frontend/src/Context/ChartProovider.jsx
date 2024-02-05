import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ChartContext = createContext();

export const ChartProovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, []);
  return (
    <ChartContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChartContext);
};
