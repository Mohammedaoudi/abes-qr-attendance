/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import FiliereComponent from "../PageComponent/FiliereComponent"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import iite from '../../../assets/images/IITE.jpg'

const Iite = () => {
  const { id } = useParams();
  const [dataFiliere, setDataFiliere] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('TOKEN');

        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDataFiliere(data.filiereInstance);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
       <h1 style={{ fontFamily: `'Inter', sans-serif`, fontSize: '2rem' }}>
        {dataFiliere.nomFiliere}
      </h1>
   

      <br />
      
        <strong>Coordonateur de la filière:</strong> <a href="#">Pr. CHAFIK BAIDADA
        </a> 
        <br />
        <br />

      
      <FiliereComponent dataFiliere={dataFiliere} />
    </>
  )
}

export default Iite
