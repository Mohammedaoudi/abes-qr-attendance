/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { qrcodeGenerator } from 'react-easy-qrcode-generator';
import html2pdf from 'html2pdf.js';
import { useParams } from "react-router-dom";


const QrPage = () => {

  const { id } = useParams();

  const [qrGenerated, setQrGenerated] = useState(false);

  const [nomSemestre, setNomSemestre] = useState("");
  const [salle, setSalle] = useState("");
  const [jour, setJour] = useState("");
  const [heureFin, setHeurFin] = useState("");

  const [heureDebut, setHeurDebut] = useState("");
  const [students, setStudents] = useState([]);






  // const [seanceInstance, setSeanceInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching seance data
        const seanceResponse = await fetch(`http://localhost:3001/api1/v1/seances/getSeance/=${id}`);
        if (!seanceResponse.ok) {
          throw new Error('Failed to fetch seance data');
        }
        const seanceData = await seanceResponse.json();
  
        const nomSemestre = seanceData.seanceInstance.element.semestre.nomSemestre;
        const jour = seanceData.seanceInstance.jour;
        const heureDebut = seanceData.seanceInstance.heureDebut;
        const heureFin = seanceData.seanceInstance.heureFin;
        const salle = seanceData.seanceInstance.salle;
        const etudiants=seanceData.seanceInstance.etudiants;

  
        // Creating the list
        const profId = localStorage.getItem('USER_ID');
        const studentIds = etudiants.map(student => ({ "eleve": student._id }));
        const createListRequestBody = {
          students: studentIds,
          seance: id,
          prof: profId
        };
  
        const createListResponse = await fetch('http://localhost:3001/api1/v1/liste/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createListRequestBody)
        });
  
        if (!createListResponse.ok) {
          throw new Error('Failed to create the list');
        }
  
        // Fetching the updated list
        const getListResponse = await fetch(`http://localhost:3001/api1/v1/liste/getListe/${id}`);
        if (!getListResponse.ok) {
          throw new Error('Failed to fetch updated list data');
        }
        const listData = await getListResponse.json();
  
        if (listData && listData.students && listData.students.length > 0) {
          const updatedStudents = listData.students.map(item => ({
            ...item.eleve,
            absence: item.absence
          }));
          setStudents(updatedStudents);
        } else {
          console.log('No students found in the updated list');
        }
  
        // Setting state with fetched data
        setNomSemestre(nomSemestre);
        setJour(jour);
        setHeurFin(heureFin);
        setHeurDebut(heureDebut);
        setSalle(salle);
  
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchData();
  }, [id, students]);
  


  useEffect(() => {
    if (!qrGenerated) {
      const qrContainer = document.getElementById('qr-code');

      if (qrContainer) {
        // Nettoyer le QR code précédent avant d'en générer un nouveau
        qrContainer.innerHTML = '';

        // Utiliser la fonction qrcodeGenerator pour générer le QR code
        qrcodeGenerator({
          value: "123",
          size: '300x300', // Augmented size
          title: 'Title',
          qrAlt: 'QR Code Image',
          showQrId: 'qr-code',
          container: qrContainer,
        });

        setQrGenerated(true);
      }
    }
  }, [qrGenerated]);

  const generateAndDownloadPdf = () => {
    students.forEach(element => {
      console.log(element)
    });
    // Create a string with the HTML content
    var htmlContent = `
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fiche d'Absence</title>
        <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .table-container {
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 8px 15px; /* Reduced padding */
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        h1, h2, p {
            text-align: center;
            font-size: 18px; /* Reduced font size */
        }
        h1 {
            margin-bottom: 10px;
            text-decoration: underline;
        }
        h2 {
            margin-top: 0;
            margin-bottom: 5px;
        }
        .footer {
            margin-top: 20px;
        }
    </style>
        </head>
        <body>
        
        <div class="container">
            <header>
                <h1>Fiche d'Absence</h1>
                <h2>${nomSemestre}</h2>
                <h2>Salle:${salle} </h2>
                <h2>Année: 2023/2024</h2>
                <p>Date:| ${jour} | ${heureDebut}  | ${heureFin} </p>
            </header>
        
            <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>CNE</th>
                      <th>Nom</th>
                      <th>Présent 8h30-10h:15</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">`
    students.forEach(element => {
      htmlContent += `
            <tr>
            <td>${element.cne}</td>
            <td>${element.nom} ${element.prenom}</td>
            <td>${element.absence}</td>
            </tr>
            `
    });

    htmlContent += `       
                  </tbody>
                </table>
            </div>
        
            <div class="footer">
            </div>
        </div>
        
        </body>
        
        </html>
        
    `;


    // Options for html2pdf conversion
    const options = {
      margin: 1,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Convert HTML to PDF
    html2pdf().from(htmlContent).set(options).save();
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
      <br />
      <br />
      <br />
      <h1 className="text-center mb-4">Cours Python: Baidada</h1>
      <div id="qr-code" className="mb-4"></div>
      <button onClick={generateAndDownloadPdf} className="btn btn-danger mt-3">Stop Lancement</button>
    </div>
  );
}

export default QrPage;
