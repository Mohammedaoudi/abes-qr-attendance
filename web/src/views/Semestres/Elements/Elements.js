/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormElement from './FormElement';


function Element() {
    const [elements, setElements] = useState([]);
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);
    const [elementAModifier, setElementAModifier] = useState(null);
    const { idSemestre } = useParams();
    const { id } = useParams();
    

    const fetchElements = async () => {
        try {
            const token = localStorage.getItem('TOKEN');

            const response = await fetch('http://localhost:3001/api1/v1/elements/showElements', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des éléments');
            }
            const data = await response.json();
            const elementfiltrer=data.filter((element)=>element.semestre===idSemestre);
            setElements(elementfiltrer);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des éléments:', error);
        }
    };

    useEffect(() => {
        fetchElements();
    }, []);

    const afficherLeFormulaire = () => {
        setAfficherFormulaire(true);
    };

    const fermerLeFormulaire = () => {
        setAfficherFormulaire(false);
        setElementAModifier(null); // Réinitialiser l'élément à modifier lorsque le formulaire est fermé
    };

    const afficherFormulaireModification = (element) => {
        setElementAModifier(element);
        setAfficherFormulaire(true);
    };

    const ajouterElement = async (element) => {
        const elementAajouter = {};
        elementAajouter.filieres = id;
        elementAajouter.semestre = idSemestre;
        console.log(element);

        if (element.libelleElement) {
            elementAajouter.libelleElement = element.libelleElement;
        }
        if (element.module) {
            elementAajouter.module = element.module;
        }
        if (element.professeur) {
            const [nom, prenom] = element.professeur.split(' ');
            elementAajouter.nom = nom;
            elementAajouter.prenom = prenom;
        }
        console.log(elementAajouter);

        try {
            const token = localStorage.getItem('TOKEN');

            const response = await fetch('http://localhost:3001/api1/v1/elements/createElement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(elementAajouter)
            });


            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout de l'élément");
            }

            const data = await response.json();
            console.log('Élément ajouté avec succès:', data);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'élément:", error);
        }
        fetchElements();
    };

    const supprimerElement = (elementId) => {
        const token = localStorage.getItem('TOKEN');

        fetch(`http://localhost:3001/api1/v1/elements/deletelement/${elementId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression de l'élément");
                }
                console.log('Élément supprimé avec succès');
                fermerLeFormulaire();
                fetchElements();
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'élément:", error);
            });
    };

    const modifierElement = async (elementAModifier) => {
        try {
            const elementModifier = {};

            if (elementAModifier.libelleElement) {
                elementModifier.libelleElement = elementAModifier.libelleElement;
            }
            if (elementAModifier.module) {
                elementModifier.module = elementAModifier.module;
            }
            if (elementAModifier.professeur) {
                const [nom, prenom] = elementAModifier.professeur.split(' ');
                elementModifier.nom = nom;
                elementModifier.prenom = prenom;
            }
            console.log("elemnntmoddk",elementAModifier)

            const token = localStorage.getItem('TOKEN');

            const response = await fetch(`http://localhost:3001/api1/v1/elements/updateElement/${elementAModifier._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(elementModifier)
            });
            

            if (!response.ok) {
                throw new Error("Erreur lors de la modification de l'élément");
            }

            const data = await response.json();

            console.log('Élément modifié avec succès:', data);
        } catch (error) {
            console.error("Erreur lors de la modification de l'élément:", error);
        }
        console.log("voiciii",elementAModifier)
        fetchElements();
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Libellé élément
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Module
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Professeur
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Seance
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {elements.map((element, index) => (
                            <tr
                                key={index}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.libelleElement}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                               {element.module.lebelle_module} 
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {/* {element.professeurs.nom} {element.professeurs.prenom}  */}
                                  {element.professeurs ? `${element.professeurs.nom} ${element.professeurs.prenom}` : ''}
                                </td>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {element.seances && element.seances.map((seanceItem, index) => (
                                        <div key={index}>
                                            {seanceItem.jour} ({seanceItem.heureDebut}H-{seanceItem.heureFin}H)
                                        </div>
                                    ))}


                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => afficherFormulaireModification(element)} className="text-blue-600 hover:underline">
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dialog open={afficherFormulaire} onClose={fermerLeFormulaire}>
                    <div className="flex justify-between items-center">
                        <DialogTitle sx={{ fontSize: '16px', color: 'black' }}>
                            {elementAModifier ? "Modifier l'élément" : 'Ajouter un élément'}
                        </DialogTitle>
                        <Button sx={{ color: 'red' }} onClick={fermerLeFormulaire}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <DialogContent>
                        <FormElement
                            onClose={fermerLeFormulaire}
                            ajouterElement={ajouterElement}
                            supprimerElement={supprimerElement}
                            modifierElement={modifierElement}
                            elementAModifier={elementAModifier} // Passer l'élément à modifier au composant FormElement
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex justify-center mt-4 space-x-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={afficherLeFormulaire}>
                    <strong>Ajouter</strong>
                </button>
            </div>
        </>
    );
}

export default Element;
