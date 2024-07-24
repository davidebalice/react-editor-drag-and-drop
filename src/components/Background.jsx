import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Image from "./Image";

const Background = ({ setImage, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get("/api/background-images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <>
      <Image setImage={setImage} type={type} images={images} />
    </>
  );
};

export default Background;
