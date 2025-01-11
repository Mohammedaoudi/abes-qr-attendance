/* eslint-disable prettier/prettier */
import React from 'react';
import html2pdf from 'html2pdf.js';

const ListAbs = () => {
    const generateAndDownloadPdf = () => {
        // Create a string with the HTML content
        const htmlContent = `
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
                <h2>1er année cycle ingénieur - S2</h2>
                <h2>Filière: 2ITE2 | Salle: B8</h2>
                <h2>Année: 2023/2024</h2>
                <p>Date: Mercredi| Cours: Cryptographie&Sécurité informatique </p>
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
                  <tbody>
                    <tr>
                      <td>K82782</td>
                      <td>CHOUAY WALID</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>R2762762</td>
                      <td>DAOUDI MOHAMMED</td>
                      <td>oui</td>
                    </tr>
                    <tr>
                      <td>K872879</td>
                      <td>MANDOUR ILYASS</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>R2762762</td>
                      <td> BOULKENADEL ABDERAHMANE</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>K82782</td>
                      <td>ECHTAYBI AYMAN</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>R2762762</td>
                      <td>FATHENNOUR MOHAMMED</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>K82782</td>
                      <td>BALLOUK MOHAMMED</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>R2762762</td>
                      <td>BESSAM ADAM</td>
                      <td>non</td>
                    </tr>
                
                    <tr>
                      <td>R2762762</td>
                      <td>EDDERSSI YOUSSEF</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>K82782</td>
                      <td>CHEGDALL MOHAMMED AMINE</td>
                      <td>non</td>
                    </tr>
                    <tr>
                      <td>R2762762</td>
                      <td>ELHARCHI ZAKARIA</td>
                      <td>non</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        
            <div class="footer">
                <p>Nom du professeur: EL BOUJNOUNI</p>
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
        <div>
            <button onClick={generateAndDownloadPdf}>Generate PDF</button>
        </div>
    );
};

export default ListAbs;
