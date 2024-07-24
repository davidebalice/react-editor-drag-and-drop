import * as htmlToImage from "html-to-image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../assets/images/logoWhite.png";
import api from "../utils/api";

const Header = ({ components, design_id }) => {
  const [loader, setLoader] = useState(false);

  const saveImage = async () => {
    const getDiv = document.getElementById("mainDesign");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: components,
      };
      console.log(obj);

      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);
      try {
        setLoader(true);
        const { data } = await api.put(
          `/api/update-user-design/${design_id}`,
          formData
        );
        if (data.message.includes("Demo")) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  const downloadImage = async () => {
    const getDiv = document.getElementById("mainDesign");
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    var link = document.createElement("a");
    link.download = "image";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-[60px] bg-gradient-to-r from-[#212122] via-[#27282b] to-[#2a2b2c] w-full">
      <div className="flex justify-between px-10 items-center text-gray-400 h-full">
        <div className="w-[110px] h-[40px]">
          <Link to="/">
            <img className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>
        <span className="text-xl">React Editor Drag and Drop</span>

        <div className="flex justify-center items-center gap-2 text-gray-200">
          <button
            disabled={loader}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#7482f6] rounded-md"
          >
            {loader ? "Loading.." : "Save"}
          </button>

          <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#a855f7] rounded-md"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
