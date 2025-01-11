/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import FiliereComponent from "../PageComponent/FiliereComponent"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Gee = () => {
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
        Le lancement de la filière Génie énergétique et électrique s’inscrit dans le cadre des actions engagées pour accompagner la stratégie nationale
        relative au Plan Energie Maroc. Elle vise la formation d’ingénieurs comptants qui sont en mesure d’assurer
        la supervision des installations électriques en termes de production, d’optimisation, de récupération, de transport,
        de distribution et de conversion de l’énergie électrique et qui sont capables de concevoir et mettre en œuvre des systèmes énergétiques durables.
        <br />
        <br />
        <strong>Coordonateur de la filière:</strong> <a>PR MOHAMED EL JOUAD
        </a> </p>
        <FiliereComponent   dataFiliere={dataFiliere} />
    </>
  )
}

export default Gee