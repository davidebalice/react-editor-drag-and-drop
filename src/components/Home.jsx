import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { useComponentsContext } from "../context/ComponentsContext";
import api from "../utils/api";
import Item from "./Home/Item";

const Home = () => {
  const { setCurrentComponent } = useComponentsContext();
  const [designs, setDesign] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    width: 800,
    height: 600,
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const create = () => {
    if (config.demoMode) {
      toast.error("Demo mode. Create new design is not allowed.");
    } else {
      navigate("/design/create", {
        state: {
          type: "create",
          width: state.width,
          height: state.height,
        },
      });
    }
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
    setCurrentComponent("");
    get_user_design();
  }, []);

  const deleteDesign = async (design_id) => {
    if (confirm("Confirm delete of this design?")) {
      try {
        const { data } = await api.put(`/api/delete-user-image/${design_id}`);
        if (data.message.includes("Demo")) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          get_user_design();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="pt-1 pl-3">
      <div className="w-full flex justify-start items-center relative rounded-md overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            create();
          }}
          className={` top-16 left-1 gap-3 bg-[#252627] w-[580px] p-4 text-white flex`}
        >
          <div className="flex gap-5 justify-center items-start flex-row items-center">
            <button className="flex items-center px-4 py-2 text-[15px] overflow-hidden text-center bg-[#32769ead] text-white rounded-[3px] font-medium hover:bg-[#1e830f] w-full">
              <FontAwesomeIcon icon={faPlus} className="text-[21px] mr-2" />
              Create Design
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
        <div className="demoHome">
          <b>Demo Mode</b>
          <br />
          Crud operations are not allowed.
        </div>
      </div>

      <div>
        <h2 className="text-xl py-0 mt-5 font-semibold text-white">
          Your designs
        </h2>
        <h4 className="text-l py-0 mb-5 font-semibold text-white">
          Click on design to modify
        </h4>
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
                      <Item key={i} design={d} deleteDesign={deleteDesign} />
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
