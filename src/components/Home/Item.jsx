import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../../config";

const Item = ({ design, delete_design, type }) => {
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("token");
  const url = `${config.designUrl}${design.image_url}?t=${token}`;

  return (
    <div
      className={`relative group w-full ${
        type ? "h-[140px]" : "h-[170px] px-2"
      } `}
    >
      <Link
        to={`/design/${design._id}/edit`}
        className={`w-full h-full block bg-[#ffffff12] rounded-md ${
          type ? "" : "p-4"
        } `}
      >
        <img
          className="w-full h-full rounded-md overflow-hidden"
          src={`${url}`}
          alt=""
        />
      </Link>
      <div
        onClick={() => delete_design(design._id)}
        className="absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block"
      >
        <FaTrashAlt />
      </div>
    </div>
  );
};

export default Item;
