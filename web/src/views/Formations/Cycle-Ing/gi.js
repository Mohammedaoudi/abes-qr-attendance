/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import FiliereComponent from "../PageComponent/FiliereComponent"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Gi = () => {
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
        La filière vise à former des ingénieurs polyvalents capables de gérer et d'améliorer les performances des systèmes industriels et
        de services complexes. Les élèves acquerront des compétences en analyse, modélisation et résolution de problèmes
        liés à la gestion des entreprises, en mettant particulièrement l'accent sur la gestion industrielle.

        La formation prépare les étudiants à s'intégrer facilement dans le monde professionnel,
        ainsi qu'à poursuivre des études doctorales ou à s'engager dans la recherche. Elle comprend des enseignements techniques,
        économiques et managériaux avancés pour fournir aux élèves les outils nécessaires à leur réussite professionnelle.
        <br />
        <br />
        <strong>Coordonarice de la filière:</strong> <a>PR MOUNIA ACHAK
        </a> </p>
        <FiliereComponent   dataFiliere={dataFiliere} />
    </>
  )
}

export default Gi