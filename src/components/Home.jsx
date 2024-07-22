import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Item from "./Home/Item";

const Home = () => {
  const [designs, setDesign] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    width: 640,
    height: 480,
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const create = () => {
    navigate("/design/create", {
      state: {
        type: "create",
        width: state.width,
        height: state.height,
      },
    });
  };

  const get_user_design = async () => {
    try {
      const { data } = await api.get("/api/user-designs");
      setDesign(data.designs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_user_design();
  }, []);

  const delete_design = async (design_id) => {
    try {
      const { data } = await api.put(`/api/delete-user-image/${design_id}`);
      toast.success(data.message);
      get_user_design();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="pt-1 pl-3">
      <div className="w-full flex justify-start items-center relative rounded-md overflow-hidden">
        <form
          onSubmit={create}
          className={` top-16 left-1 gap-3 bg-[#252627] w-[580px] p-4 text-white`}
        >
          <div className="flex gap-5 justify-center items-start flex-row items-center">
            <button className="px-4 py-2 text-[15px] overflow-hidden text-center bg-[#32769ead] text-white rounded-[3px] font-medium hover:bg-[#1e830f] w-full">
              + Create Design
            </button>
            <label htmlFor="width">Width</label>
            <input
              onChange={inputHandle}
              type="number"
              name="width"
              id="width"
              value={state.width}
              className="w-[100px] outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md"
            />

            <label htmlFor="height">Height</label>
            <input
              onChange={inputHandle}
              type="number"
              name="height"
              id="height"
              value={state.height}
              className="w-[100px] outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md"
            />
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-xl py-6 font-semibold text-white">Your designs</h2>
        <div className="overflow-x-auto flex justify-start items-start w-full">
          <div
            className={
              "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            }
          >
            {designs && designs.length > 0 ? (
              designs.map(
                (d, i) =>
                  d._id !== "design_id" && (
                    <>
                      <Item key={i} design={d} delete_design={delete_design} />
                    </>
                  )
              )
            ) : (
              <p>No designs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
