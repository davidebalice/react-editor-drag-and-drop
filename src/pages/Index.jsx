import React, { useState } from "react";
import toast from "react-hot-toast";
import logo from "../assets/images/logoWhite.png";
import api from "../utils/api";

const Index = () => {
  const [type, setType] = useState("login");
  const [show, setShow] = useState(true);
  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const user_register = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await api.post("/api/user-register", state);
      setLoader(false);
      localStorage.setItem("token", data.token);
      setState({
        name: "",
        email: "",
        password: "",
      });
      window.location.href = "/";
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };
  //end method

  const user_login = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await api.post("/api/user-login", state);
      setLoader(false);

      localStorage.setItem("token", data.token);
      setState({
        email: "",
        password: "",
      });

      window.location.href = "/";
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };
  //end method

  return (
    <div className="bg-[#18191b] min-h-screen w-full loginBg">
      <div className="w-full h-full justify-center items-center">
        <div className="py-[70px] flex justify-center items-center flex-col gap-6">
          <div className="w-[140px] h-[52px]">
            <img className="w-full h-full" src={logo} alt="" />
          </div>
          <h2 className="text-5xl text-[#c7c5c5] font-bold">
            Editor Drag and Drop
          </h2>
          <span className="text-[#aca9a9] text-2xl font-medium">
            Created in React and Node
          </span>
        </div>

        <div className="w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative opacity-75">
          {type === "login" && (
            <form onSubmit={user_login}>
              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandle}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button
                  disabled={loader}
                  className="px-3 py-2 rounded-md bg-[#34569f]   hover:bg-[#163984] w-full outline-none text-white"
                >
                  {loader ? "loading.." : "Login"}
                </button>
              </div>
              <div className="px-3 py-2 w-full text-white border-2 mt-10 border-dashed border-[#595959] rounded-md">
                Demo data:
                <br />
                Email: mario@rossi.it
                <br />
                Password: 12345678
              </div>
            </form>
          )}
          {type === "register" && (
            <form onSubmit={user_register}>
              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="name">Name</label>
                <input
                  onChange={inputHandle}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={state.name}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandle}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button
                  disabled={loader}
                  className="px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white"
                >
                  {loader ? "loading.." : "Register"}
                </button>
              </div>

              <div className="flex py-4 justify-between items-center px-3">
                <div className="w-[45%] h-[1px] bg-slate-500 "></div>
                <div className="w-[6%] text-center flex pb-1 px-1 text-white">
                  Or
                </div>
                <div className="w-[45%] h-[1px] bg-slate-500 "></div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
