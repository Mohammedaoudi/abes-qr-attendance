/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import FiliereComponent from "../PageComponent/FiliereComponent"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
const Isic = () => {
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
      <p>
        Les Technologies de l’Information et de la Communication (TIC) jouent un rôle majeur dans la compétitivité des entreprises et dans
        l’efficacité des administrations et des services publics (santé, éducation, sécurité). Le secteur des TIC est devenu un segment majeur
        de l’économie des principaux pays industrialisés et les perspectives de croissances de ce secteur
        dans notre pays sont par ailleurs considérables et requiert un grand nombre d’ingénieurs et de chercheurs.
        <br />
        <br />
        <strong>Coordonateur de la filière:</strong> <a>PR MOHAMED EL JOURMI
        </a> </p>
        <FiliereComponent   dataFiliere={dataFiliere} />
    </>
  )
}

export default Isic