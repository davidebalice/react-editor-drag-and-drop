import React from "react";
import styles from "./styles.module.css";

const Controls = ({ id, info, exId }) => {
  const elementId = parseInt(exId || id);

  return (
    <>
      <div
        onMouseDown={() => info.moveElement(elementId, info)}
        className={`dragDiv ${styles.dragIcon} ${styles.bgHover} hidden absolute group-hover:block -top-[0] left-[0] translate-[0%,0%] w-[100%] h-[100%] z-[99999]`}
      ></div>
      {info["type"] !== "title" && (
        <>
          <div
            onMouseDown={() => info.resizeElement(elementId, info)}
            className="hidden absolute group-hover:block -bottom-[7px] -right-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onMouseDown={() => info.resizeElement(elementId, info)}
            className="hidden absolute group-hover:block -top-[7px] -right-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onMouseDown={() => info.resizeElement(elementId, info)}
            className="hidden absolute group-hover:block -bottom-[7px] -left-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onMouseDown={() => info.resizeElement(elementId, info)}
            className="hidden absolute group-hover:block -top-[7px] -left-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
        </>
      )}
    </>
  );
};

export default Controls;
