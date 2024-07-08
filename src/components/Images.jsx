import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import api from "../utils/api";
import Image from "./Image";

const Images = ({ add_image }) => {
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

  /*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem('token'); // Recupera il token JWT dal localStorage

      try {
        const response = await axios.get('/api/user/images', {
          headers: {
            Authorization: `Bearer ${token}`, // Passa il token nell'intestazione Authorization
          },
        });
        setImages(response.data.images); // Imposta l'array di immagini nel componente di stato
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero delle immagini:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []); // Esegui solo una volta al caricamento del componente

  if (loading) {
    return <p>Caricamento immagini...</p>;
  }

  if (error) {
    return <p>Errore nel caricamento delle immagini. Prova di nuovo più tardi.</p>;
  }

  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={`Immagine ${index}`} />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;

*/

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
        <Image add_image={add_image} images={images} />
      </div>
    </div>
  );
};

export default Images;
