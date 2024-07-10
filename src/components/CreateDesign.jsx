import * as htmlToImage from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";
import api from "../utils/api";
import Components from "./Components";

const CreateDesign = () => {
  const ref = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  const obj = {
    name: "main_frame",
    type: "rect",
    id: Math.floor(Math.random() * 100 + 1),
    height: state.height,
    width: state.width,
    z_index: 1,
    color: "#fff",
    image: "",
  };

  const [loader, setLoader] = useState(false);

  const createDesign = async () => {
    const image = await htmlToImage.toBlob(ref.current);
    const design = JSON.stringify(obj);

    if (image) {
      const formData = new FormData();
      formData.append("design", design);
      formData.append("image", image);
      console.log(formData);
      try {
        setLoader(true);
        const { data } = await api.post("/api/create-user-design", formData);
        console.log(data);
        if (data) {
          navigate(`/design/${data.design._id}/edit`);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        //console.log(error.response.data)
      }
    }
  };

  useEffect(() => {
    if (state && ref.current) {
      createDesign();
    } else {
      navigate("/");
    }
  }, [state, ref]);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="relative w-auto h-auto overflow-auto">
        <Components info={obj} currentComponent={{}} />
      </div>
      {loader && (
        <div className="left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute">
          <RotateLoader color="white" />
        </div>
      )}
    </div>
  );
};

export default CreateDesign;
