/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import FiliereComponent from "../PageComponent/FiliereComponent"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Gc = () => {
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
      La filière Génie Civil est une filière d’enseignement supérieur proposée dans le cycle d’ingénieur à l’Ecole Nationale des Sciences Appliquées d’El Jadida.
      
       Dans cette filière, les enseignements sont programmés sur une durée de cinq semestres de formation à notre école et se termine par un semestre 
       de stage professionnel ou de recherche dans un organisme national ou international. Dans chaque semestre, sept modules sont proposés. Dans tous les modules, 
       les enseignements sont dispensés sous forme de cours magistraux, de travaux dirigés et des activités pratiques et sont renforcés par des stages, des visites d’entreprises, 
       des conférences et séminaires ainsi que des échanges avec différentes institutions publiques et privées.
        <br />
        <br />
        <strong>Coordonatrice de la filière:</strong> <a>PR SAFAA ASSIF
        </a> </p>
        <FiliereComponent   dataFiliere={dataFiliere} />
    </>
  )
}

export default Gc