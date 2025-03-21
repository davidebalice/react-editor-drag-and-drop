import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import api from "../utils/api";
import Image from "./Image";

const Images = ({ addImage }) => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const image_upload = async (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      try {
        setLoader(true);
        const { data } = await api.post("/api/add-user-image", formData);
        setImages([...images, data.userImage]);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const get_images = async () => {
      try {
        const { data } = await api.get("/api/get-user-image");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    get_images();
  }, []);

  return (
    <div>
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-md text-white mb-3">
        <label className="text-center cursor-pointer" htmlFor="image">
          Upload Image
        </label>
        <input
          readOnly={loader}
          onChange={image_upload}
          type="file"
          id="image"
          className="hidden"
        />
      </div>

      {loader && (
        <div className="flex justify-center items-center mb-2">
          <BarLoader color="#fff" />
        </div>
      )}

      <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
        <Image addImage={addImage} images={images} type="uploadImage" />
      </div>
    </div>
  );
};

export default Images;
