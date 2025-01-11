/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import '../../../style/style.css';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import FormSeance from './FormeSeanceajouter.js';
import { useParams } from "react-router-dom";

import 'tailwindcss/tailwind.css';
import CloseIcon from '@mui/icons-material/Close';



// Composant principal Emploi
export default function Emploi() {
  const { idSemestre } = useParams();
  const { id } = useParams();
  console.log("id de filiere", id);


  // États locaux
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [emplois, setEmplois] = useState([]);
  const [seanceAModifier, setSeanceAModifier] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  const fetchSeances = async () => {
    try {
      const token = localStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api1/v1/seances/getSeances', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      console.log("dataaaa",data)

      const filteredSeances = data.filter(seance => seance.element.semestre=== idSemestre);
      const seancesAvecColonne = filteredSeances.map(seance => ({
        ...seance,
        colonne: determineColonne(seance.heureDebut, seance.heureFin),
      }));
      console.log(seancesAvecColonne)

      setEmplois(seancesAvecColonne);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeances();
  }, []);


  // Fonction pour afficher le formulaire
  const afficherLeFormulaire = () => {
    setAfficherFormulaire(true);
  };

  // Fonction pour fermer le formulaire
  const fermerLeFormulaire = () => {
    setAfficherFormulaire(false);
    setSeanceAModifier(null);
  };
  const ajouterSeance = async (seance) => {
    const seanceAajouter = {};
    console.log("sence bghi neid",seance)
  
    // Récupérer la valeur du groupe sélectionné
    seanceAajouter.etudiants=seance.etudiants;
  
    // Ajouter les attributs de la séance
    if (seance.libelleElement) {
      seanceAajouter.libelleElement = seance.libelleElement;
    }
    if (seance.salle) {
      seanceAajouter.salle = seance.salle;
    }
    if (seance.professeur) {
      const [nom, prenom] = seance.professeur.split(' ');
      seanceAajouter.nom = nom;
      seanceAajouter.prenom = prenom;
    }
    if (seance.jour) {
      seanceAajouter.jour = seance.jour;
    }
    if (seance.semaine) {
      seanceAajouter.semaine = seance.semaine;
    }
    if (seance.heureDebut) {
      seanceAajouter.heureDebut = seance.heureDebut;
    }
    if (seance.heureFin) {
      seanceAajouter.heureFin = seance.heureFin;
    }
    console.log("okli",seanceAajouter)
    try {
      // Effectuer la requête d'ajout de séance
      const token = localStorage.getItem('TOKEN');
  
      const response = await fetch('http://localhost:3001/api1/v1/seances/createSeance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(seanceAajouter)
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la séance');
      }
  
      const data = await response.json();
    
  
      // Mettre à jour l'état local avec la nouvelle séance
      setEmplois(prevEmplois => [...prevEmplois, data]); // Utilisation de la fonction de mise à jour de l'état précédent
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la séance:', error);
      // Gérez l'erreur de manière appropriée, par exemple en affichant un message à l'utilisateur
    }
  
    // Rafraîchir les données des séances après l'ajout
    fetchSeances();
  };
  
  // const ajouterSeance = async (seance) => {
  //   const seanceAajouter = {};
  //   seanceAajouter.etudiants=etudiants;
  //   if (seance.libelleElement) {
  //     seanceAajouter.libelleElement = seance.libelleElement;
  //   }
  //   if (seance.salle) {
  //     seanceAajouter.salle = seance.salle;
  //   }
  //   if (seance.professeur) {
  //     const [nom, prenom] = seance.professeur.split(' ');
  //     seanceAajouter.nom = nom;
  //     seanceAajouter.prenom = prenom;
  //   }
  //   if (seance.jour) {
  //     seanceAajouter.jour = seance.jour;
  //   }
  //   if (seance.semaine) {
  //     seanceAajouter.semaine = seance.semaine;
  //   }
  //   if (seance.heureDebut) {
  //     seanceAajouter.heureDebut = seance.heureDebut;
  //   }
  //   if (seance.heureFin) {
  //     seanceAajouter.heureFin = seance.heureFin;
  //   }
    
  //   // seanceAajouter.semestre=idSemstre;
  //   console.log('seancee azzz ajouterr', seanceAajouter)

  //   try {

  //     const token = localStorage.getItem('TOKEN');

  //     const response = await fetch('http://localhost:3001/api1/v1/seances/createSeance', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(seanceAajouter)
  //     });

  //     console.log(seance)

  //     if (!response.ok) {

  //       throw new Error('Erreur lors de l\'ajout de la séance');
  //     }

  //     const data = await response.json();
  //     console.log('Séance ajoutée avec succès:', data);

  //     // Mettre à jour l'état local avec la nouvelle séance
  //     setEmplois(prevEmplois => [...prevEmplois, data]); // Utilisation de la fonction de mise à jour de l'état précédent

  //   } catch (error) {
  //     console.error('Erreur lors de l\'ajout de la séance:', error);
  //     // Gérez l'erreur de manière appropriée, par exemple en affichant un message à l'utilisateur
  //   }

  //   fetchSeances();
  // };


  const supprimerSeance = (seanceId) => {
    const token = localStorage.getItem('TOKEN');
    fetch(`http://localhost:3001/api1/v1/seances/deleteSeance/=${seanceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la séance');
        }
        console.log("Séance supprimée avec succès");
        fermerLeFormulaire();
        fetchSeances();
        // Mettre à jour localement les séances après suppression si nécessaire
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la séance:', error);
      });

  };

  // Fonction pour préparer la modification d'une séance
  const preparerModification = (seance) => {
    console.log("seance a preparer", seance)
    setSeanceAModifier(seance);
    setAfficherFormulaire(true);
  };


  // };
  const modifierSeance = (seanceModifiee) => {
    const token = localStorage.getItem('TOKEN');
    // Recherche de l'index de la séance à modifier
    const index = emplois.findIndex(seance =>
      seance.jour === seanceAModifier.jour &&
      seance.heureDebut === seanceAModifier.heureDebut &&
      seance.heureFin === seanceAModifier.heureFin
    );
  

    // Vérification si la séance à modifier a été trouvée
    if (index !== -1) {
      // Définition des données à envoyer dans la requête de modification
      const seanceModifieeSansColonne = {};
      seanceModifieeSansColonne.etudiants=seanceModifiee.etudiants;

      if (seanceModifiee.libelleElement) {
        seanceModifieeSansColonne.libelleElement = seanceModifiee.libelleElement;
      }
      if (seanceModifiee.salle) {
        seanceModifieeSansColonne.salle = seanceModifiee.salle;
      }
      if (seanceModifiee.professeur) {
        const [nom, prenom] = seanceModifiee.professeur.split(' ');
        seanceModifieeSansColonne.nom = nom;
        seanceModifieeSansColonne.prenom = prenom;
      }
      if (seanceModifiee.jour) {
        seanceModifieeSansColonne.jour = seanceModifiee.jour;
      }
      if (seanceModifiee.semaine) {
        seanceModifieeSansColonne.semaine = seanceModifiee.semaine;
      }
      if (seanceModifiee.heureDebut) {
        seanceModifieeSansColonne.heureDebut = seanceModifiee.heureDebut;
      }
      if (seanceModifiee.heureFin) {
        seanceModifieeSansColonne.heureFin = seanceModifiee.heureFin;
      }
      console.log("seanceeeeeeemod",seanceModifieeSansColonne)

      fetch(`http://localhost:3001/api1/v1/seances/updateSeance/=${seanceModifiee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(seanceModifieeSansColonne)
      })

        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Erreur lors de la modification de la séance');
          }
          return response.json();

        })
        .then(data => {
          // Mise à jour de l'emploi avec la séance modifiée
          const nouveauxEmplois = [...emplois];
          nouveauxEmplois[index] = data;
          setEmplois(nouveauxEmplois);
          console.log("Session modifiée :", data);
          fermerLeFormulaire();
          fetchSeances();

        })


        .catch(error => {
          console.error('Erreur lors de la modification de la séance:', error);

        });


    } else {
      console.error("Erreur : Séance à modifier non trouvée");
    }
  };

  const determineColonne = (heureDebut, heureFin) => {
    if (heureDebut === "08:30" && heureFin === "10:15") {
      return 1;
    } else if (heureDebut === "10:30" && heureFin === "12:15") {
      return 2;
    } else if (heureDebut === "13:30" && heureFin === "15:15") {
      return 3;
    } else if (heureDebut === "15:30" && heureFin === "17:15") {
      return 4;
    } else {
      console.error("Erreur : La session ne correspond à aucune colonne");
      return undefined;
    }
  };

  return (
    <div >
      <title>Emploi du temps</title>

      <h1 className="text-3xl lg:text-4xl text-center mb-4 mx-auto border border-sm border-gray-500">

        <strong> Emploi du temps</strong>
      </h1>
      <div className="overflow-x-auto">
        <table className="mx-auto border border-collapse border-black">
          <thead>
            <tr>
              <td className="border auto-style8"><strong>Jour / Heure</strong></td>
              <td className="border auto-style8"><strong>08h30 - 10h15</strong></td>
              <td className="border auto-style8"><strong>10h30 - 12h15</strong></td>
              <td className="border auto-style8"><strong>13h30 - 15h15</strong></td>
              <td className="border auto-style8"><strong>15h30 - 17h15</strong></td>
            </tr>
          </thead>

          <tbody>
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((jour, index) => (
              <tr key={index}>
                <td className="border auto-style8" id='style'><strong>{jour}</strong></td>
                {[1, 2, 3, 4].map((colonne, i) => (
                  <td key={i} className="border cellule">
                    {emplois
                      .filter(seance => seance.jour === jour && seance.colonne === colonne)
                      .map((seance, idx) => (
                        <div key={idx}>
                          <p><strong>
                          {seance.element.libelleElement}
                          </strong>
                          ({seance.professeur.nom} {seance.professeur.prenom})  
                          </p>
                          <p>
                            {seance.semaine}</p><p>[{seance.salle}]
                          </p>
                          <button onClick={() => preparerModification(seance)}>Modifier</button>
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      {/* {afficherFormulaire && (
        <div className={`fixed top-${afficherFormulaire ? '1/2' : '10'} left-1/2 transform -translate-x-1/2 ${afficherFormulaire ? '-translate-y-1/2' : '0'} bg-white rounded-lg shadow-lg w-full md:max-w-md lg:max-w-lg xl:max-w-xl`}>
          <button className="absolute top-0 right-0 m-2" onClick={fermerLeFormulaire}>
            <i className="bx bx-x-circle text-2xl"></i>
          </button>
          <FormSeance
            onClose={fermerLeFormulaire}
            ajouterSeance={ajouterSeance}
            supprimerSeance={supprimerSeance}
            modifierSeance={modifierSeance}
            seanceAModifier={seanceAModifier}
          />
        </div>
      )}  */}
      <Dialog
        open={afficherFormulaire}
        onClose={fermerLeFormulaire}

      >
        <div className="flex justify-between items-center">
          <DialogTitle sx={{ fontSize: '  16px', color: 'black' }} >
            Ajouter Une séance
          </DialogTitle>
          <Button sx={{ color: 'red' }} onClick={fermerLeFormulaire}>
            <CloseIcon />
          </Button>
        </div>

        <DialogContent>


          <FormSeance
            onClose={fermerLeFormulaire}
            ajouterSeance={ajouterSeance}
            supprimerSeance={supprimerSeance}
            modifierSeance={modifierSeance}
            seanceAModifier={seanceAModifier}
           
          />


        </DialogContent>

      </Dialog>



      <div className="flex justify-center mt-4 space-x-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={afficherLeFormulaire}><strong>Ajouter</strong></button>
      </div>
    </div>
  );
}

