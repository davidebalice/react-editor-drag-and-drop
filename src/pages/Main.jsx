import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsImages } from "react-icons/bs";
import {
  FaCloudUploadAlt,
  FaFolderOpen,
  FaShapes,
  FaTrashAlt,
} from "react-icons/fa";
import { FaTextHeight } from "react-icons/fa6";
import { LuLayoutTemplate } from "react-icons/lu";
import { MdDeselect, MdKeyboardArrowLeft } from "react-icons/md";
import { RxTransparencyGrid } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import Background from "../components/Background";
import CreateComponent from "../components/Components";
import Header from "../components/Header";
import Images from "../components/Images";
import PngImage from "../components/PngImage";
import Projects from "../components/Projects";
import UploadedImages from "../components/UploadImages";
import config from "../config";
import { ComponentsContext } from "../context/ComponentsContext";
import api from "../utils/api";

const Main = () => {
  const { components, setComponents, currentComponent, setCurrentComponent } =
    useContext(ComponentsContext);
  const { design_id } = useParams();

  const [state, setState] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [padding, setPadding] = useState("");
  const [font, setFont] = useState("");
  const [weight, setWeight] = useState("");
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState("");
  const [zIndex, setzIndex] = useState("");

  const [radius, setRadius] = useState(0);

  const [show, setShow] = useState({
    status: true,
    name: "",
  });

  const setElements = (type, name) => {
    setState(type);
    setShow({
      state: false,
      name,
    });
  };

  useEffect(() => {
    const newComponent = {
      name: "background",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      width: 800,
      height: 600,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    };
    setComponents([...components, { newComponent }]);
  }, []);

  useEffect(() => {
    if (currentComponent) {
      const index = components.findIndex((c) => c.id === currentComponent.id);
      if (index >= 0) {
        const temp = components.filter((c) => c.id !== currentComponent.id);
        components[index].width = width || currentComponent.width;
        components[index].height = height || currentComponent.height;
        components[index].rotate = rotate || currentComponent.rotate;

        if (currentComponent.name === "text") {
          components[index].font = font || currentComponent.font;
          components[index].padding = padding || currentComponent.padding;
          components[index].weight = weight || currentComponent.weight;
          components[index].title = text || currentComponent.title;
        }

        if (currentComponent.name === "image") {
          components[index].radius = radius || currentComponent.radius;
        }

        if (currentComponent.name === "background" && image) {
          components[index].image = image || currentComponent.image;
        }

        if (currentComponent.name !== "background") {
          components[index].left = left || currentComponent.left;
          components[index].top = top || currentComponent.top;
          components[index].opacity = opacity || currentComponent.opacity;
          components[index].z_index = zIndex || currentComponent.z_index;
        }

        components[index].color = color || currentComponent.color;

        setComponents([...temp, components[index]]);

        setColor("");
        setLeft("");
        setTop("");
        setPadding("");
        setFont("");
        setWeight("");
        setWidth("");
        setHeight("");
        setRotate(0);
        setOpacity("");
        setzIndex("");
        setText("");
      }
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    opacity,
    zIndex,
    padding,
    font,
    weight,
    text,
    radius,
    rotate,
    currentComponent,
  ]);

  const disableSelection = () => {
    document.body.classList.add("no-select");
  };

  const enableSelection = () => {
    document.body.classList.remove("no-select");
  };

  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      disableSelection();
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);

      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      e.preventDefault();
      enableSelection();
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const resizeElement = (id, currentInfo, direction, directionY) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const currentDivChild = currentDiv.children[0];

    const mouseMove = ({ movementX, movementY }) => {
      disableSelection();

      const getStyle = window.getComputedStyle(currentDiv);
      let newLeft = parseInt(getStyle.left);
      let newTop = parseInt(getStyle.top);
      let newWidth = parseInt(getStyle.width);
      let newHeight = parseInt(getStyle.height);

      if (isMoving) {
        currentDiv.style.outline = "1px dashed #999";
        if (currentInfo.type !== "rect") {
          currentDiv.style.background = "rgba(0,0,0,0.3)";
        }

        if (direction === "left") {
          newWidth -= movementX;
          newLeft += movementX;
          currentDiv.style.left = `${newLeft}px`;
        } else if (direction === "right") {
          newWidth += movementX;
        }

        if (directionY === "top") {
          newHeight -= movementY;
          newTop += movementY;
          currentDiv.style.top = `${newTop}px`;
        } else if (directionY === "bottom") {
          newHeight += movementY;
        }

        currentDiv.style.width = `${newWidth}px`;
        currentDiv.style.height = `${newHeight}px`;
        currentDivChild.style.width = `${newWidth}px`;
        currentDivChild.style.height = `${newHeight}px`;
        setTop(parseInt(currentDiv.style.top));
        setLeft(parseInt(currentDiv.style.left));
      }
    };

    const mouseUp = (e) => {
      enableSelection();
      isMoving = false;
      currentDiv.style.outline = "none";
      if (currentInfo.type !== "rect") {
        currentDiv.style.background = "none";
      }
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    const target = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      disableSelection();
      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      if (movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    };

    const mouseUp = (e) => {
      e.preventDefault();
      enableSelection();
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const removeComponent = (id) => {
    if (confirm("Delete this component?")) {
      if (config.demoMode) {
        toast.error("Demo mode. Delete is not allowed");
      } else {
        const temp = components.filter((c) => c.id !== id);
        setCurrentComponent("");
        setComponents(temp);
      }
    }
  };

  const deselectAll = () => {
    setCurrentComponent("");
  };

  const removeBackground = () => {
    const selectedComponent = components.find(
      (c) => c.id === currentComponent.id
    );
    const otherComponents = components.filter(
      (c) => c.id !== currentComponent.id
    );
    selectedComponent.image = "";
    setImage("");
    setComponents([...otherComponents, selectedComponent]);
  };

  const opacityHandle = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  const createShape = (name, type) => {
    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setComponents([...components, style]);
  };

  const addText = (name, type) => {
    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: 20,
      width: 300,
      height: 70,
      title: "Lorem ipsum dolor sit amet",
      weight: 400,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setWeight("");
    setFont("");
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const addImage = (img, type) => {
    setCurrentComponent("");
    const style = {
      id: Date.now(),
      name: "image",
      type: type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      radius: 0,
      image: img,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  useEffect(() => {
    const getDesign = async () => {
      try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        const { design } = data;

        for (let i = 0; i < design.length; i++) {
          design[i].setCurrentComponent = (a) => setCurrentComponent(a);
          design[i].moveElement = moveElement;
          design[i].resizeElement = resizeElement;
          design[i].rotateElement = rotateElement;
          design[i].removeBackground = removeBackground;
        }
        setComponents(design);
      } catch (error) {
        console.log(error);
      }
    };
    getDesign();
  }, [design_id]);

  const upload = () => {
    if (config.demoMode) {
      toast.error("Demo mode. Upload photo is not allowed.");
    } else {
      setElements("image", "uploadImage");
    }
  };

  return (
    <div className="min-w-screen h-screen bg-black">
      <Header
        components={components}
        design_id={design_id}
        setCurrentComponent={setCurrentComponent}
      />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto">
          <Link
            to="/"
            className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 rounded-md `}
          >
            <div
              className={` ${
                show.name === "projects" ? "bg-[#252627]" : ""
              } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
            >
              <span className="text-2xl">
                <FaFolderOpen />
              </span>
              <span className="text-xs font-medium">Projects</span>
            </div>
          </Link>

          <div
            onClick={() => setElements("shape", "shape")}
            className={`${
              show.name === "shape" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>

          <div
            onClick={() => setElements("png", "png")}
            className={` ${
              show.name === "png" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <LuLayoutTemplate />
            </span>
            <span className="text-xs font-medium">Png</span>
          </div>

          <div
            onClick={() => upload()}
            className={`${
              show.name === "uploadImage" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaCloudUploadAlt />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>

          <div
            onClick={() => setElements("text", "text")}
            className={`${
              show.name === "text" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaTextHeight />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>

          <div
            onClick={() => setElements("initImage", "images")}
            className={` ${
              show.name === "images" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsImages />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div>

          <div
            onClick={() => setElements("background", "background")}
            className={`${
              show.name === "background" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
        </div>

        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>

            {state === "shape" && (
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => createShape("shape", "rect")}
                  className="w-[90px] h-[90px] bg-[#999] cursor-pointer hover:bg-[#888] mt-5"
                ></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="w-[90px] h-[90px] bg-[#999] cursor-pointer rounded-full hover:bg-[#888] mt-5"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
                  className="w-[90px] h-[90px] bg-[#999] cursor-pointer hover:bg-[#888] mt-5"
                ></div>
              </div>
            )}
            {state === "image" && <UploadedImages addImage={addImage} />}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => addText("text", "title")}
                    className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm hover:bg-[#888]"
                  >
                    <h2>
                      <>+</> Add A Text
                    </h2>
                  </div>
                </div>
              </div>
            )}
            {state === "project" && (
              <Projects type="main" design_id={design_id} />
            )}
            {state === "initImage" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <Images addImage={addImage} />
              </div>
            )}
            {state === "png" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <PngImage type="png" addImage={addImage} />
              </div>
            )}
            {state === "background" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <Background type="background" setImage={setImage} />
              </div>
            )}
          </div>

          <div className="w-full flex h-full">
            <div
              className={`flex column justify-center relative items-center h-full flexColumn ${
                !currentComponent ? "w-full" : "w-[100%] overflow-hidden "
              }`}
            >
              <div className="helpMessageContainer w-[800px]">
                <div className="helpMessage">
                  Click on a content to access controls
                </div>
                <div className="deselectButton" onClick={() => deselectAll()}>
                  <MdDeselect style={{ fontSize: "22px" }} />
                  Deselect all
                </div>
              </div>

              <div className="m-w-[800px] m-h-[600px] flex justify-center items-center overflow-hidden">
                <div
                  id="mainDesign"
                  className="w-auto relative h-auto overflow-hidden"
                >
                  {components.map((c, i) => (
                    <CreateComponent
                      key={i}
                      info={c}
                      currentComponent={currentComponent}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-full w-[240px] text-gray-300 bg-[#252627] px-3 py-2 right-[0] fixed">
              {currentComponent && (
                <div className="flex gap-6 flex-col items-start h-full px-3 justify-start mt-4">
                  <>
                    <div className="flex gap-1 justify-start items-start">
                      <span className="text-md w-[70px]">Width</span>
                      <input
                        onChange={(e) => {
                          setWidth(parseInt(e.target.value));
                          /*
                        
                         setCurrentComponent({
                            ...currentComponent,
                            width: e.target.value,
                          })
                        */
                        }}
                        className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                        type="number"
                        step={1}
                        value={currentComponent.width}
                      />
                    </div>

                    <div className="flex gap-1 justify-start items-start">
                      <span className="text-md w-[70px]">Height</span>
                      <input
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                        type="number"
                        step={1}
                        value={currentComponent.height}
                      />
                    </div>
                  </>

                  <div className="flex gap-4 justify-start items-start">
                    <span>Color :</span>
                    <label
                      className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: `${
                          currentComponent.color &&
                          currentComponent.color !== "#fff"
                            ? currentComponent.color
                            : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      className="invisible"
                      id="color"
                    />
                  </div>
                  {currentComponent.name === "background" &&
                    currentComponent.image && (
                      <div
                        className="p-[6px] bg-slate-600 text-white cursor-pointer"
                        onClick={removeBackground}
                      >
                        Remove Background
                      </div>
                    )}

                  {currentComponent.name !== "background" && (
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Opacity</span>
                        <input
                          onChange={opacityHandle}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={currentComponent.opacity}
                        />
                      </div>

                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Z-Index</span>
                        <input
                          onChange={(e) => setzIndex(parseInt(e.target.value))}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={currentComponent.z_index}
                        />
                      </div>

                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Rotate</span>
                        <input
                          onChange={(e) => setRotate(parseInt(e.target.value))}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={currentComponent.rotate}
                        />
                      </div>

                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Delete</span>

                        <div
                          onClick={() => removeComponent(currentComponent.id)}
                          className="px-3 py-2 bg-white  group-hover:block cursor-pointer rounded-md"
                        >
                          <FaTrashAlt
                            style={{ fontSize: "14px", color: "#555" }}
                          />
                        </div>
                      </div>

                      {currentComponent.name === "image" && (
                        <div className="flex gap-1 justify-start items-start">
                          <span className="text-md w-[70px]">Radius</span>
                          <input
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            type="number"
                            step={1}
                            value={currentComponent.radius}
                          />
                        </div>
                      )}

                      {currentComponent.name === "text" && (
                        <>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Padding : </span>
                            <input
                              onChange={(e) =>
                                setPadding(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={currentComponent.padding}
                            />
                          </div>

                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Font Size</span>
                            <input
                              onChange={(e) =>
                                setFont(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={currentComponent.font}
                            />
                          </div>

                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Weight : </span>
                            <input
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={currentComponent.weight}
                            />
                          </div>

                          <div className="flex gap-2 flex-col justify-start items-start">
                            <input
                              onChange={(e) =>
                                setCurrentComponent({
                                  ...currentComponent,
                                  title: e.target.value,
                                })
                              }
                              className="border border-gray-700 bg-transparent outline-none p-2 rounded-md"
                              type="text"
                              value={currentComponent.title}
                            />
                            <button
                              onClick={() => setText(currentComponent.title)}
                              className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
                            >
                              Add Text
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
