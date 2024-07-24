import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Image from "./Image";

const PngImage = ({ addImage, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get("/api/png-images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <>
      <Image addImage={addImage} type={type} images={images} />
    </>
  );
};

export default PngImage;
