import React from "react";
import config from "../config";

const Image = ({ add_image, images, type, setImage }) => {
  const token = localStorage.getItem("token");
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((item, i) => (
        <div
          key={i}
          onClick={() =>
            type === "background"
              ? setImage(item.image_url)
              : add_image(item.image_url)
          }
          className="w-full h-[90px] overflow-hidden rounded-md cursor-pointer"
        >
          <img
            className="w-full h-full"
            src={`${config.imageUrl}${item.image_url}?t=${token}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default Image;
