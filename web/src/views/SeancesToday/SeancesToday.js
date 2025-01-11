/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconQrcode } from '@tabler/icons-react';
import axios from 'axios';
// import { qrcodeGenerator } from 'react-easy-qrcode-generator';
import { Link } from 'react-router-dom';
const profId = localStorage.getItem('PROFID');
const userNom = localStorage.getItem('USERNOM');



const determineState = (heureDebut, heureFin) => {

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const [startHourStr, startMinuteStr] = heureDebut.split(':');
  const [endHourStr, endMinuteStr] = heureFin.split(':');

  let currentHourInt = parseInt(currentHour, 10);
  currentHourInt -= 1;
  const currentMinuteInt = parseInt(currentMinute, 10);
  const startHourInt = parseInt(startHourStr, 10);
  const startMinuteInt = parseInt(startMinuteStr, 10);
  const endHourInt = parseInt(endHourStr, 10);
  const endMinuteInt = parseInt(endMinuteStr, 10);

  if (
    (currentHourInt > startHourInt || (currentHourInt === startHourInt && currentMinuteInt >= startMinuteInt)) &&
    (currentHourInt < endHourInt || (currentHourInt === endHourInt && currentMinuteInt < endMinuteInt))
  ) {
    return 'open';
  } else {
    return 'close';
  }
};

const createData = (name, state, sectionX, salleX, heureX, seanceId) => {
  return {
    name,
    state,
    infos: [
      {
        salle: salleX,
        section: sectionX,
        heure: heureX,
      },
    ],
    seanceId,
  };
};

const Row = (props) => {
  const { row } = props;
  const seanceId = row.seanceId

  const [open, setOpen] = useState(false);
  // const qrCodeRef = useRef(null);

  // const launchFullScreen = async () => {
  //   try {
  //     // Envoyer une requête POST pour créer un nouveau QR code associé à la séance
  //     const response = await axios.post('http://localhost:3001/api1/v1/Qr/qr-codes', {
  //       seanceId: row.seanceId,
  //       code: '878', // Utilisez la valeur du code appropriée
  //     });

  //     // Vérifiez si la requête a réussi avant de procéder
  //     if (response.status === 201) {
  //       // Générer le QR code avec les données de la réponse
  //       const qrCodeElement = qrcodeGenerator({
  //         value: response.data.code, // Utilisez le code QR reçu de la réponse
  //         size: '180x180',
  //         title: 'Title',
  //         qrAlt: 'QR Code Image',
  //         showQrId: 'qr-code',
  //       });

  //       // Ajouter le QR code à la page
  //       const body = document.querySelector('body');
  //       if (body && qrCodeElement instanceof Node) {
  //         body.appendChild(qrCodeElement);

  //         // Demander le mode plein écran pour le corps de la page
  //         if (body.requestFullscreen) {
  //           body.requestFullscreen();
  //         } else if (body.mozRequestFullScreen) {
  //           body.mozRequestFullScreen();
  //         } else if (body.webkitRequestFullscreen) {
  //           body.webkitRequestFullscreen();
  //         } else if (body.msRequestFullscreen) {
  //           body.msRequestFullscreen();
  //         }
  //       }

  //       // Ensuite, créer une liste
  //       const studsResponse = await axios.get(
  //         'http://localhost:3001/api1/v1/students/filiere/663a467640c67d7d24392866/element/element1'
  //       );
  //       const studs = studsResponse.data;
  //       const studentObjects = studs.map((student) => ({
  //         eleve: student._id,
  //         absence: false,
  //       }));

  //       const profId = '66437285c4d5685fb9865859';
  //       const seanceId = row.seanceId;

  //       // Création de l'objet à envoyer dans la requête POST
  //       const listeData = {
  //         prof: profId,
  //         seance: seanceId,
  //         students: studentObjects,
  //       };

  //       const listResponse = await axios.post('http://localhost:3001/api1/v1/liste/create', listeData);

  //       console.log('Liste créée avec succès:', listResponse.data);
  //     } else {
  //       console.error('Erreur lors de la création du QR code:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la création du QR code:', error);
  //   }
  // };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right" style={{ color: row.state === 'close' ? 'red' : 'green' }}>
          {row.state}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Salle</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Heure</TableCell>
                    {row.state === 'open' && <TableCell>LanceQR</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.infos.map((infoRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {infoRow.salle}
                      </TableCell>
                      <TableCell>{infoRow.section}</TableCell>
                      <TableCell>{infoRow.heure}</TableCell>
                      {row.state === 'open' && (
                        <TableCell>
                          {/* <Button onClick={launchFullScreen}>
                            <IconQrcode />
                          </Button>
                          <div id="qr-code" ref={qrCodeRef} /> */}
                          <Link to={`/scan/${seanceId}`}><IconQrcode /></Link>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const SeancesToday = () => {
  const [loading, setLoading] = useState(true);
  const [seances, setSeances] = useState([]);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api1/v1/seances/seances-aujourdhui/${profId}`);
        const formattedRows = response.data.map((seance) => {
          const { heureDebut, heureFin, salle, element, _id } = seance;
          const state = determineState(heureDebut, heureFin);
          return createData(`${element.libelleElement}`, state, '2ITE', salle, `${heureDebut}-${heureFin}`, _id);
        });
        setSeances(formattedRows);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de séance:', error);
      }
    };
    fetchSeances();
  }, []);

  return (
    <div
      style={{
        background: '#2d71a1',
        padding: '120px 0',
        textAlign: 'center',
        marginBottom: '130px',
        paddingLeft: '35px',
        paddingRight: '35px',
      }}
    >
      <h3 style={{ color: 'white' }}>
        Vos séances d'aujourd'hui  <strong>{userNom}</strong>
      </h3>
      <br />
      <Paper>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <strong>Nom de Seance</strong>
              </TableCell>
              <TableCell align="right">
                <strong>état</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Chargement...</TableCell>
              </TableRow>
            ) : (
              <>
                {seances.map((seance, index) => (
                  <Row key={index} row={seance} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </Paper>
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Signaler un problème
        </Button>
        <Button variant="contained" color="primary">
          Demande d'annulation d'une séance
        </Button>
      </div>
    </div>
  );
};

export default SeancesToday;
