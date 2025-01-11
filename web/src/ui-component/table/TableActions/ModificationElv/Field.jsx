/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SelectFiliere from './SelectFiliere';
import Box from '@mui/material/Box';

import SelectIssueDe from './SelectIssueDe';
import SelectSemestre from './SelectSemestre';




const Field = ({ params, handleInputChange, onFiliereSelect, onIssueDeSelect, onSemestreSelect,filiereSelected }) => { // Accepting props
  const [nom, setName] = useState(params.nom);
  const [prenom, setPrenom] = useState(params.prenom);
  const [email, setEmail] = useState(params.email);
  const [cin, setCin] = useState(params.cin);
  const [cne, setCne] = useState(params.cne);
  const [telephone, setTelephone] = useState(params.telephone);
  const [dateNaissance, setDateNaissance] = useState(params.dateDeNaissance);
  const [lieuNaissance, setLieuNaissance] = useState(params.lieuDeNaissance);
  const [adresse, setAdresse] = useState(params.adresse);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [focused, setFocused] = useState(false);
  const [cinError, setCinError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [cneError, setCneError] = useState('');


 
 


  const handleNameChange = (event) => {
    console.log(params.nom)
    console.log('lhiiiiiiih')

    const value = event.target.value;
    setName(value);
    // Perform validation using regular expression
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(value)) {
      setNameError('Nom doit contenir uniquement des lettres.');
    } else if (value.length < 3) {
      setNameError('Nom doit contenir au moins 3 caractères.');
    } else {
      setNameError('');
    }
    handleInputChange(event);

  };

  const handlePrenomChange = (event) => {
    const value = event.target.value;
    setPrenom(value);
    // Perform validation using regular expression
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(value)) {
      setPrenomError('Prenom doit contenir uniquement des lettres.');
    } else if (value.length < 3) {
      setPrenomError('Prenom doit contenir au moins 3 caractères.');
    } else {
      setPrenomError('');
    }
    handleInputChange(event);

  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    // Email validation using regular expression
    const regex = /^[^\s@]+@[^\s@]+\.(gmail\.com|yahoo\.com)$/i; // Validating for Gmail.com and Yahoo.com domains
    if (!regex.test(value)) {
      setEmailError('Adresse email invalide ou domaine non supporté.');
    } else {
      setEmailError('');
    }
    handleInputChange(event);

  };

  const handleCinChange = (event) => {
    const value = event.target.value;
    setCin(value);
    // Validation using regular expression
    const regex = /^[a-zA-Z0-9]*$/; // Only allow alphanumeric characters
    if (!regex.test(value)) {
      setCinError('CIN doit contenir uniquement des caractères alphanumériques.');
    } else {
      setCinError('');
    }
    handleInputChange(event);

  };
  const handleCneChange = (event) => {
    const value = event.target.value;
    setCne(value);
    // Validation using regular expression
    const regex = /^[a-zA-Z0-9]*$/; // Only allow alphanumeric characters
    if (!regex.test(value)) {
      setCneError('CNE doit contenir uniquement des caractères alphanumériques.');
    } else {
      setCneError('');
    }
    handleInputChange(event);

  };

  const handleTelephoneChange = (event) => {
    const value = event.target.value;
    setTelephone(value);
    // Validation using regular expression
    const regex = /^(\+)?\d*$/;
    if (!regex.test(value)) {
      setTelephoneError('Numéro de téléphone doit contenir uniquement des chiffres.');
    } else {
      setTelephoneError('');
    }
    handleInputChange(event);

  };

  const handleDateNaissanceChange = (event) => {
    setDateNaissance(event.target.value);
    handleInputChange(event);

  };

  const handleLieuNaissanceChange = (event) => {
    setLieuNaissance(event.target.value);
    handleInputChange(event);

  };

  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
    handleInputChange(event);

  };
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setNameError('');
    setEmailError('');
    setCinError('');
    setTelephoneError('');
    setPrenomError('');
  };


  return (

    <>
     

      <TextField
        autoFocus
        required
        margin="dense"
        id="nom"
        name="nom"
        label="Nom"
        fullWidth
        variant="standard"
        value={nom}
        onChange={handleNameChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!nameError}
        helperText={nameError}
      
      />
      <TextField
        required
        margin="dense"
        id="prenom"
        name="prenom"
        label="Prenom"
        fullWidth
        variant="standard"
        value={prenom}
        onChange={handlePrenomChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!prenomError}
        helperText={prenomError}
      />
      <TextField
        required
        margin="dense"
        id="email"
        name="email"
        label="Email"
        fullWidth
        type="email"
        variant="standard"
        value={email}
        onChange={handleEmailChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!emailError && focused}
        helperText={emailError && focused ? emailError : ''}
      />
      <TextField
        required
        margin="dense"
        id="cin"
        name="cin"
        label="CIN"
        fullWidth
        variant="standard"
        value={cin}
        onChange={handleCinChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!cinError && focused}
        helperText={cinError && focused ? cinError : ''}
      />
       <TextField
        required
        margin="dense"
        id="cne"
        name="cne"
        label="CNE"
        fullWidth
        variant="standard"
        value={cne}
        onChange={handleCneChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!cneError && focused}
        helperText={cneError && focused ? cneError : ''}
      />
      <TextField
        margin="dense"
        id="telephone"
        name="telephone"
        label="Numéro de téléphone"
        fullWidth
        variant="standard"
        value={telephone}
        onChange={handleTelephoneChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!telephoneError && focused}
        helperText={telephoneError && focused ? telephoneError : ''}
      />
      <TextField
        margin="dense"
        id="dateNaissance"
        name="dateNaissance"
        fullWidth
        type='date'
        variant="standard"
        value={dateNaissance}
        onChange={handleDateNaissanceChange}
      />

      <TextField
        margin="dense"
        id="lieuNaissance"
        name="lieuNaissance"
        label="Lieu de Naissance"
        fullWidth
        variant="standard"
        value={lieuNaissance}
        onChange={handleLieuNaissanceChange}
      />
      <TextField
        margin="dense"
        id="adresse"
        name="adresse"
        label="Adresse"
        fullWidth
        variant="standard"
        value={adresse}
        onChange={handleAdresseChange}
      />
      <br />
      
  
      <Box component="section" sx={{    paddingBottom: "1px" }}>
     <SelectFiliere params={params} onFiliereSelect={onFiliereSelect} /> {/* Pass onFiliereSelect prop */}
      </Box>

      <Box component="section" sx={{ paddingBottom: "1px" }}>
      <SelectSemestre params={params} onSemestreSelect={onSemestreSelect} filiereSelected={filiereSelected}/> {/* Pass onIssueDeSelect prop */}
      </Box>
      <Box component="section" sx={{ paddingBottom: "1px" }}>
      <SelectIssueDe params={params} onIssueDeSelect={onIssueDeSelect} /> {/* Pass onIssueDeSelect prop */}
      </Box>


    </>
  )
}

export default Field
