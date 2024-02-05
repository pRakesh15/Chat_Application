import React, { Children, useRef, useState } from "react";
import create from "../Images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showbuttion, setShowbuttion] = useState(false);
  const [loding, SetLoding] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  //function fore image prevw
  const handelImageClick = () => {
    inputRef.current.click();
  };
  //function for disable the create buttion
  const isSave=Boolean(email) && Boolean(username) && Boolean(password) && Boolean(pic);

  //function for create user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      setShowbuttion(true);
      SetLoding(true);
      const { data } = await axios.post(
        `${server}/user/createUser`,
        {
          username,
          email,
          password,
          pic,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message, {
        position: "bottom-right",
        theme: "colored",
      });
      localStorage.setItem('userInfo',JSON.stringify(data));
      navigate("/chart");
      setShowbuttion(false);
      SetLoding(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        theme: "colored",
      });
      setShowbuttion(false);
      SetLoding(false);
    }
  };
  //function for post profilePic...
  const postPic = async (pics) => {
    SetLoding(true);
    if (pic === undefined) {
      toast.warn("Please select an immage !!", {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chartApp2");
      data.append("cloud_name", "dcycd6p6i");
      await fetch("https://api.cloudinary.com/v1_1/dcycd6p6i/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          SetLoding(false);
         
          
        })
        .catch((error) => {
          console.log(error);
          SetLoding(false);
        });
            

    } else {
      toast.warn("Please select an immage !!", {
        position: "bottom-right",
        theme: "colored",
      });
      SetLoding(false);
    }
   
  };
  return (
    <div>
      <div className="bg-[#afe2e7] h-screen">
        <div className=" flex flex-col items-center ">
          <h1 className="font-Cinzel text-4xl border-b-2 border-black p-4 px-10 mt-10">
            SignUp
          </h1>
          <div className="flex border-2  mt-6 bg-white rounded-2xl shadow-xl shadow-red-300">
            <div className="static">
              <img
                src={create}
                alt="Login"
                className="h-80 mt-5 rounded-2xl static "
              />
              <div
             //this is for our image privew section
              className=" absolute -mt-[233px] border-2 border-black h-[60px] w-[60px] ml-[239px] rounded-md flex items-center justify-center ">
              {
                pic?(
                  <img src={pic} alt="hela" className="h-[57px] w-[58px] rounded-sm" loading="lazy" />
                ):(<img src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="" className="h-full w-[59px]" />)
              }
              </div>
            </div>
            <div className="flex flex-col p-5 -ml-10">
              <h1 className="text-xl pl-16  pb-3 border-b-2 border-black">
                Create Accoount
              </h1>
              <form className="flex flex-col" onSubmit={createUser}>
                <input
                  className="mt-6 w-72 h-9 p-1 border-2 outline-none border-red-500 rounded"
                  type="text"
                  name="username"
                  placeholder="UserName"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />

                <input
                  className="mt-2 w-72 h-9 p-1 border-2 outline-none border-red-500 rounded"
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />

                <input
                  className="mt-2 w-72 h-9 p-1 border-2 outline-none border-red-500 rounded"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <div
                  onClick={handelImageClick}
                  className="flex mt-2 justify-center text-red-700 cursor-pointer"
                >
                  Upload Profile Picture
                  <FaUpload className="ml-3 mt-1" />
                  <input
                    type="file"
                    ref={inputRef}
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postPic(e.target.files[0])}
                    className="hidden invisible"
                  />
                </div>
                <button
                  className="bg-red-600 h-8 w-20 text-xl rounded mt-5 ml-24 flex items-center justify-center cursor-pointer"
                  disabled={!isSave}
                  onClick={createUser}
                >
                  {loding ? "Loading.." : "Create"}
                </button>
              </form>
              <p className=" mt-6 text-xl">
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="text-blue-800 border-b-2 border-red-500"
                >
                  LogIn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
