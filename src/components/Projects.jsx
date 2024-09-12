import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import Item from "./Item";

const Projects = ({ type, design_id }) => {
  const [designs, setDesign] = useState([]);

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

  const deleteDesign = async (design_id) => {
    try {
      const { data } = await api.put(`/api/delete-user-image/${design_id}`);
      toast.success(data.message);
      get_user_design();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full">
      <div
        className={
          type
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {designs && designs.length > 0 ? (
          designs.map(
            (d, i) =>
              d._id !== design_id && (
                <>
                  <Item
                    key={i}
                    design={d}
                    type={type}
                    deleteDesign={deleteDesign}
                  />
                </>
              )
          )
        ) : (
          <p>No designs found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
