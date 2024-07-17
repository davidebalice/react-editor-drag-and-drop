import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Image from "./Image";

const Background = ({ setImage, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const get_images = async () => {
      try {
        const { data } = await api.get("/api/background-images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    get_images();
  }, []);

  return (
    <>
      <Image setImage={setImage} type={type} images={images} />
    </>
  );
};

export default Background;
