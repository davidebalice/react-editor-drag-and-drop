import React from "react";
import config from "../config";
import Controls from "./Controls";

const Components = ({ info, currentComponent, removeComponent }) => {
  //const randValue = Math.floor(Math.random() * 100);
  const randValue = info.id;
  const token = localStorage.getItem("token");
  let html = "";

  const currentSize = (currentInfo) => {
    //currentInfo.setCurrentComponent(currentInfo);
    const currentDiv = document.getElementById(currentInfo.id);
    currentDiv.style.width = currentInfo.width + "px";
    currentDiv.style.height = currentInfo.height + "px";
  };

  if (info.name === "main_frame") {
    html = (
      <div
        onMouseEnter={() => currentSize(info)}
        onClick={() => info.setCurrentComponent(info)}
        className="shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img
            className="w-full h-full"
            src={`${config.imageUrl}${info.image}?t=${token}`}
            alt="image"
          />
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={randValue}
        onMouseEnter={() => currentSize(info)}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group"
      >
       
        <Controls id={randValue} info={info} exId="" />
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={randValue}
        onMouseEnter={() => currentSize(info)}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          width: info.width + "px",
          height: info.height + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group"
      >
        <div
          id={`${randValue}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>

       
        <Controls id={randValue} info={info} exId={`${randValue}c`} />
      </div>
    );
  }

  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={randValue}
        onMouseEnter={() => currentSize(info)}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group"
      >
        <div
          id={`${randValue}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
        ></div>

      
        <Controls id={randValue} info={info} exId={`${randValue}t`} />
      </div>
    );
  }

  if (info.name === "text") {
    html = (
      <div
        id={randValue}
        onMouseEnter={() => currentSize(info)}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          width: info.width + "px",
          height: info.height + "px",
          padding: info.padding + "px",
          color: info.color,
          opacity: info.opacity,
        }}
        className="absolute group"
      >
        <div
          style={{
            fontSize: info.font + "px",
            fontWeight: info.weight,
            width: info.width + "px",
            height: info.height + "px",
          }}
        >
          {info.title}
        </div>
  
        <Controls id={randValue} info={info} exId="" />
      </div>
    );
  }

  if (info.name === "image") {
    html = (
      <div
        id={randValue}
        onMouseEnter={() => currentSize(info)}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          opacity: info.opacity,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group"
      >
        <div
          className="overflow-hidden"
          id={`${randValue}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img
            className="w-full h-full"
            src={`${config.imageUrl}${info.image}?t=${token}`}
            alt="image"
          />
        </div>

      
        <Controls id={randValue} info={info} exId={`${randValue}img`} />
      </div>
    );
  }

  return html;
};

export default Components;
