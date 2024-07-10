import React from "react";
import styles from "./styles.module.css";

const Element = ({ id, info, exId }) => {
  return (
    <>
      {exId ? (
        <>
          <div
            onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[7px] -right-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          >
            {" "}
          </div>
          <div
            onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -top-[7px] -right-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          >
            {" "}
          </div>
          <div
            onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[7px] -left-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          >
            {" "}
          </div>
        </>
      ) : (
        <>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[7px] -right-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          >
            {" "}
          </div>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -top-[7px] -right-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          >
            {" "}
          </div>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[7px] -left-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
          >
            {" "}
          </div>
        </>
      )}

      <div
        onMouseDown={() => info.resizeElement(id, info)}
        className="hidden absolute group-hover:block -top-[7px] -left-[7px] w-[14px] h-[14px] cursor-nesw-resize bg-green-600 z-[99999] "
      >
        {" "}
      </div>

      <div
        onMouseDown={() => info.moveElement(id, info)}
        className={`${styles.dragIcon} ${styles.bgHover} hidden absolute group-hover:block -top-[0] left-[0] translate-[0%,0%] w-[100%] h-[100%]  z-[99999]`}
      >
      </div>
      {/*
<div onMouseDown={() => info.moveElement(id,info)}  className='hidden absolute group-hover:block top-[50%] -left-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nesw-resize bg-blue-600 z-[99999] '> </div>

<div onMouseDown={() => info.moveElement(id,info)}  className='hidden absolute group-hover:block top-[50%] -right-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nesw-resize bg-blue-600 z-[99999] '> </div>

<div onMouseDown={() => info.moveElement(id,info)}  className='hidden absolute group-hover:block -bottom-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-nesw-resize bg-blue-600 z-[99999] '> </div>

*/}
    </>
  );
};

export default Element;
