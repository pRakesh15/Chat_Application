import React, { useEffect, useState } from "react";
import login from "../Images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showbuttion, setShowbuttion] = useState(false);
  const navigate = useNavigate();

  //craete loginHendler

  const loginHendler = async (e) => {
    try {
      e.preventDefault();
      setShowbuttion(true);
      const { data } = await axios.post(
        `${server}/user/loginUser`,
        {
          email,
          password,
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
      // console.log(data.message)
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chart");
      setShowbuttion(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        theme: "colored",
      });
      setShowbuttion(false);
    }
  };
  useEffect(()=>
  {
    const user=JSON.parse(localStorage.getItem("userInfo"));
    if(user)
    {
      navigate("/chart");
    }
  },[navigate]);

  return (
    <>
      <div className="bg-[#afe2e7] h-screen">
        <div className=" flex flex-col items-center ">
          <h1 className="font-Cinzel text-4xl border-b-2 border-black p-4 px-10 mt-10">
            Login
          </h1>
          <div className="flex border-2  mt-6 bg-white rounded-2xl shadow-xl shadow-red-300">
            <div>
              <img
                src={login}
                alt="Login"
                className="h-96 rounded-2xl mt-5 -ml-5"
              />
            </div>
            <div className="flex flex-col p-5 -ml-10">
              <h1 className="text-xl pl-[88px] mt-10 pb-3 border-b-2 border-black">
                Users Login
              </h1>
              <form className="flex flex-col" onSubmit={loginHendler}>
                <input
                  className="mt-8 w-72 h-9 p-1 border-2 outline-none border-red-500 rounded"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="mt-2 w-72 h-9 p-1 border-2 outline-none border-red-500 rounded"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="bg-red-600 h-10 w-24 text-xl rounded mt-5 ml-24 flex items-center justify-center"
                  disabled={showbuttion}
                >
                  Login
                </button>
              </form>
              <p className="ml-[48px] mt-6 text-xl">
                New Here ?{" "}
                <Link
                  to="/Signup"
                  className="text-blue-800 border-b-2 border-red-500"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
