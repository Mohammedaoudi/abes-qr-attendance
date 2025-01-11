import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useParams } from 'react-router-dom';

export default function FormElement({ onClose, ajouterElement, supprimerElement, modifierElement, elementAModifier }) {
  const { idSemestre } = useParams();
  const { id } = useParams();
  const [professeurs, setProfesseurs] = useState([]);
  const [modules, setModules] = useState([]);
  const fetchProfesseurs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api1/v1/professeurs/getAll');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      console.log('professeurs', data);
      const professeursFiltres = data.filter((professeur) => professeur.filieres.some((filiere) => filiere._id === id));
      setProfesseurs(professeursFiltres);
      console.log(professeursFiltres);
    } catch (error) {
      console.error('Erreur lors de la récupération des professeurs :', error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await fetch('http://localhost:3001/api1/v1/modules/showALL');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();

      const modulesFiltres = data.filter((module) => module.semestre._id === idSemestre);
      setModules(modulesFiltres);
      console.log(modulesFiltres);
    } catch (error) {
      console.error('Erreur lors de la récupération des modules :', error);
    }
  };

  useEffect(() => {
    fetchProfesseurs();
    fetchModules();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const libelleElement = e.target.elements['libelle'].value;
    const professeur = e.target.elements['Professeur'].value;
    const module = e.target.elements['Module'].value;
    const description = e.target.elements['description'].value;

    if (elementAModifier) {
      modifierElement({ _id: elementAModifier._id, libelleElement, professeur, module, description });
    } else {
      ajouterElement({ libelleElement, professeur, module, description });
    }

    onClose();
  };

  useEffect(() => {
    if (elementAModifier) {
      if (elementAModifier.libelleElement) {
        document.getElementById('libelle').value = elementAModifier.libelleElement;
      }
      if (elementAModifier.description) {
        document.getElementById('description').value = elementAModifier.description;
      }
      if (elementAModifier && elementAModifier.professeur) {
        const professeurId = elementAModifier.professeur._id;
        const professeurOption = document.querySelector(`#Professeur option[value="${professeurId}"]`);

        if (professeurOption) {
          professeurOption.selected = true;
        }
      }
      if (elementAModifier.module) {
        const moduleId = elementAModifier.module._id;
        const moduleOption = document.querySelector(`#Module option[value="${moduleId}"]`);

        if (moduleOption) {
          moduleOption.selected = true;
        }
      }
    }
  }, [elementAModifier]);
  console.log('kolchgii', elementAModifier);

  const handleSupprimer = () => {
    if (elementAModifier) {
      supprimerElement(elementAModifier._id);
      onClose();
    } else {
      console.error('Erreur : Aucune séance à supprimer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">
              <strong>Element de module</strong>
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="libelle">Libellé élément</label>
                <input type="text" id="libelle" name="libelle" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="Module">Module</label>
                <select id="Module" name="Module" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50">
                  {elementAModifier
                    ? modules.map((module) => (
                        <option key={module._id} value={module.id} selected={module._id === elementAModifier.module._id}>
                          {module.lebelle_module}
                        </option>
                      ))
                    : modules.map((module) => (
                        <option key={module._id} value={module.id}>
                          {module.lebelle_module}
                        </option>
                      ))}
                </select>
              </div>
              <div className="md:col-span-5">
                <label htmlFor="Professeur">Professeur</label>
                <select id="Professeur" name="Professeur" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50">
                  {professeurs.map((professeur) => (
                    <option key={professeur._id} value={professeur.id}>
                      {professeur.nom} {professeur.prenom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-5">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
            </div>
          </div>
          <div className="md:col-span-5 text-right mb-4 lg:mb-0">
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                {elementAModifier ? 'Modifier' : 'Ajouter'}
              </button>
              {elementAModifier && (
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
