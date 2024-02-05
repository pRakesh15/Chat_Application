import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { ChatState } from "../../Context/ChartProovider";
import ProfileModel from "../utilities/ProfileModel";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../main";
import Loding from "../utilities/Loding";
import UserList from "../utilities/UserList";
import { getSender } from "../../../config/chatLogic";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

function SideDrower() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loding, setLoding] = useState(false);
  const [lodingChrt, setLodingChrt] = useState();
  const {
    user,
    setSelectedChat,
    setChats,
    chats,
    notification,
    setNotification,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();

  //fassing error when clicking into the search buttion and in the user list
  // like  when i try to search the user and try to craete chart then that poticular error is occure

  //logOut function

  const logoutHendler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  //search function

  const searchHendler = async () => {
    if (!search) {
      toast.warning("enter somthing to search", {
        position: "top-left",
        theme: "colored",
      });
    }
    try {
      setLoding(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${server}/user?search=${search}`,
        config
      );
      setLoding(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load the search results", {
        position: "bottom-right",
        theme: "colored",
      });
      setLoding(false);
    }
  };

  //create  function for craeting chats...

  const accessChart = async (userId) => {
    try {
      setLodingChrt(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${server}/chart`, { userId }, config);
      // console.log(data)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setLodingChrt(false);
      setSelectedChat(data);
      onClose();
    } catch (error) {
      toast.error("Failed to connect to this user", {
        position: "bottom-right",
        theme: "colored",
      });
      setLodingChrt(false);
    }
  };

  return (
    <div>
      <Box className="flex justify-between items-center bg-white w-[100%] py-1 px-2 border-2">
        <Tooltip label="search user to chart" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick={onOpen}>
            <FaSearchPlus />
            <Text className="px-1 hidden md:flex">Search User</Text>
          </Button>
        </Tooltip>
        <Text className="text-xl ">Let's Talk</Text>

        <div>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<IoIosNotifications className="-ml-1 text-xl" />}
            >
            <NotificationBadge
            count={notification.length}
            effect={Effect.SCALE}/>

            </MenuButton>
            <MenuList className="pl-2">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem key={notif._id} onClick={()=>
                {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n)=>n!==notif));
                }}>
                  {notif.chat.isGroupChart
                    ? `New Message  in ${notif.chat.chartName}`
                    : `New Message From ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<FaAngleDown className="mt-1" />}
            >
              <Wrap>
                <WrapItem>
                  <Avatar size="sm" name={user.username} src={user.pic} />
                </WrapItem>
              </Wrap>
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModel>

              <MenuItem onClick={logoutHendler}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box className="flex">
              <Input
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={searchHendler}>
                {" "}
                <FaSearchPlus />
              </Button>
            </Box>
            {loding ? (
              <Loding />
            ) : (
              searchResult?.map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  functionHendler={() => accessChart(user._id)}
                />
              ))
            )}
            {lodingChrt && <Spinner ml="auto" className="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideDrower;
