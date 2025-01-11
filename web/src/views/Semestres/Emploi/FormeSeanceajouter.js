import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useParams } from 'react-router-dom';

export default function FormSeance({ onClose, ajouterSeance, supprimerSeance, modifierSeance, seanceAModifier }) {
  const [elements, setElements] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const { idSemestre } = useParams();
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchElements();
    fetchProfesseurs();
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('TOKEN');
      const response = await fetch('http://localhost:3001/api1/v1/students/getStudents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      const filteredstudents = data.filter((student) => student.semestre === idSemestre);
      setStudents(filteredstudents);
      console.log(filteredstudents)
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  };

  const fetchElements = async () => {
    try {
      const token = localStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api1/v1/elements/showElements', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      console.log("dty",data)

      const filteredElements = data.filter((element) => element.semestre === idSemestre);

      setElements(filteredElements);
    } catch (error) {
      console.error('Erreur lors de la récupération des éléments :', error);
    }
  };

  const fetchProfesseurs = async () => {
    try {
      const token = localStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api1/v1/professeurs/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      const professeurfiltre = data.filter(professeur => professeur.filieres.some(filiere => filiere._id === id));
      setProfesseurs(professeurfiltre);

    } catch (error) {
      console.error('Erreur lors de la récupération des professeurs :', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const libelleElement = e.target.elements['Element de module'].value;
    const professeur = e.target.elements['Professeur'].value;
    const heureDebut = e.target.elements['heure_debut'].value;
    const heureFin = e.target.elements['heure_fin'].value;
    const salle = e.target.elements['Salle'].value;
    const semaine = e.target.elements['Semaine'].value;
    const jour = e.target.elements['Jour'].value;
    let etudiantIds = [];
    const groupe = e.target.elements['etudiant'].value;
    if (groupe === 'Grp1') {
      etudiantIds = students.slice(0, Math.floor(students.length / 2)).map((student) => student._id);
    } else if (groupe === 'Grp2') {
      etudiantIds = students.slice(Math.floor(students.length / 2)).map((student) => student._id);
    } else {
      etudiantIds = students.map((student) => student._id);
    }

    if (seanceAModifier) {
      modifierSeance({ _id: seanceAModifier._id, libelleElement, professeur, salle, jour, semaine, heureDebut, heureFin,etudiants: etudiantIds  });
    } else {
      ajouterSeance({ libelleElement, professeur, salle, jour, semaine, heureDebut, heureFin, etudiants: etudiantIds });
    }

    onClose();
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const libelleElement = e.target.elements['Element de module'].value;
  //   const professeur = e.target.elements['Professeur'].value;
  //   const heureDebut = e.target.elements['heure_debut'].value;
  //   const heureFin = e.target.elements['heure_fin'].value;
  //   const salle = e.target.elements['Salle'].value;
  //   const semaine = e.target.elements['Semaine'].value;
  //   const jour = e.target.elements['Jour'].value;
  //   const etudiantIds = students.map(student => student._id);

  //   if (seanceAModifier) {
  //     modifierSeance({ _id: seanceAModifier._id, libelleElement, professeur, salle, jour, semaine, heureDebut, heureFin });
  //   } else {
  //     ajouterSeance({ libelleElement, professeur, salle, jour, semaine, heureDebut, heureFin,etudiants: etudiantIds });
  //   }

  //   onClose();
  // };

  useEffect(() => {
    if (seanceAModifier) {
      if (seanceAModifier.element && seanceAModifier.element.libelleElement) {
        document.getElementById('Element de module').value = seanceAModifier.element.libelleElement;
      }
      if (seanceAModifier.salle) {
        document.getElementById('Salle').value = seanceAModifier.salle;
      }
      if (seanceAModifier && seanceAModifier.professeur) {
        const professeurId = seanceAModifier.professeur._id;
        const professeurOption = document.querySelector(`#Professeur option[value="${professeurId}"]`);

        if (professeurOption) {
          professeurOption.selected = true;
        }
      }
      if (seanceAModifier.jour) {
        document.getElementById('Jour').value = seanceAModifier.jour;
      }
      if (seanceAModifier.semaine) {
        document.getElementById('Semaine').value = seanceAModifier.semaine;
      }
      if (seanceAModifier.heureDebut) {
        document.getElementById('heure_debut').value = seanceAModifier.heureDebut;
      }
      if (seanceAModifier.heureFin) {
        document.getElementById('heure_fin').value = seanceAModifier.heureFin;
      }
    }
  }, [seanceAModifier]);

  const handleSupprimer = () => {
    if (seanceAModifier) {
      supprimerSeance(seanceAModifier._id);
      onClose();
    } else {
      console.error('Erreur : Aucune séance à supprimer');
    }
  };
  const handleAddToAllStudents = (e) => {
    const selectedGroup = e.target.value;
  
    // Logique pour sélectionner les étudiants en fonction du groupe choisi
    let etudiantIds = [];
  
    if (selectedGroup === 'Grp1') {
      etudiantIds = students.slice(0, Math.floor(students.length / 2)).map(student => student._id);
    } else if (selectedGroup === 'Grp2') {
      etudiantIds = students.slice(Math.floor(students.length / 2)).map(student => student._id);
    } else {
      etudiantIds = students.map(student => student._id);
    }
  
    // Vous pouvez utiliser ces identifiants d'étudiants comme vous le souhaitez
    console.log('Étudiants sélectionnés :', etudiantIds);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">
              <strong>Séance</strong>
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="Element de module">Element de module</label>
                <select id="Element de module" name="Element de module" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50">
                  {seanceAModifier
                    ? elements.map((element) => (
                      <option key={element._id} selected={element._id === seanceAModifier.element._id}>
                        {element.libelleElement}
                      </option>
                    ))
                    : elements.map((element) => <option key={element._id}>{element.libelleElement}</option>)}
                </select>
              </div>
              <div className="md:col-span-5">
                <label htmlFor="Salle">Salle</label>
                <input type="text" id="Salle" name="Salle" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="Professeur">Professeur</label>
                <select id="Professeur" name="Professeur" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50">
                  {seanceAModifier
                    ? professeurs.map((professeur) => (
                      <option key={professeur._id} selected={professeur._id === seanceAModifier.professeur._id}>
                        {professeur.nom} {professeur.prenom}
                      </option>
                    ))
                    : professeurs.map((professeur) => (
                      <option key={professeur.id} value={professeur.id}>
                        {professeur.nom} {professeur.prenom}
                      </option>
                    ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="Jour">Jour</label>
                <select id="Jour" name="Jour" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none">
                  <option value="Lundi">Lundi</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Mercredi">Mercredi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi</option>
                </select>
              </div>
              <div className="md:col-span-5">
                <label htmlFor="Semaine"> Semaine départ-fin</label>
                <input
                  type="text"
                  id="Semaine"
                  name="Semaine"
                  className="h-8 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="SD-SF"
                />
              </div>
              <div className="md:col-span-3">
              <label htmlFor="etudiant">Groupe étudiants</label>
                <select id="etudiant" name="etudiant" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none" onChange={handleAddToAllStudents}>
                  <option value="Tous">Tous</option>
                  <option value="Grp1">Grp1</option>
                  <option value="Grp2">Grp2</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label htmlFor="heure_debut">Heure de début</label>
                <select id="heure_debut" name="heure_debut" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none">
                  <option value="08:30">08:30</option>
                  <option value="10:30">10:30</option>
                  <option value="13:30">13:30</option>
                  <option value="15:30">15:30</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label htmlFor="heure_fin">Heure de fin</label>
                <select id="heure_fin" name="heure_fin" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none">
                  <option value="10:15">10:15</option>
                  <option value="12:15">12:15</option>
                  <option value="15:15">15:15</option>
                  <option value="17:15">17:15</option>
                </select>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 text-right mb-4 lg:mb-0">
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                {seanceAModifier ? 'Modifier' : 'Ajouter'}
              </button>
              {seanceAModifier && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
                  onClick={handleSupprimer}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
