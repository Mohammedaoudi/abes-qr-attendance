/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import FiliereComponent from "../PageComponent/FiliereComponent"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Ccn = () => {
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
      L’objectif de la filière Cybersécurité & confiance 
      numérique (CCN) est de doter l’élève-ingénieur de l’ensemble des outils,
       concepts approches et méthodes de gestion de la sécurité des Sl avec une approche globale.
        Celui-ci doit ainsi être capable d’appréhender les enjeux de securite IT au sein d’une organisation notamment 
        l’intégration d’outils de protection au niveau des données, des infrastructures techniques et des systèmes applicatifs, 
        mais aussi de mécanismes de détection/réaction aux cyberattaques lui permettant
       d’assurer un haut niveau de confiance au sein de l’organisation
        <br />
        <br />
        <strong>Coordonateur de la filière:</strong> <a>PR Ali KARTIT
        </a> </p>

        <FiliereComponent   dataFiliere={dataFiliere} />
    </>
  )
}

export default Ccn