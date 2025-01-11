/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import SelectFiliere from './selectFiliere/SelectFiliereProf';
import SelectElements from './Select elements/SelectElements';

const Field = ({ handleInputChange, onFiliereSelect, onElementSelect, filiereSelected }) => {
  const [name, setName] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [cin, setCin] = useState('');
    const [telephone, setTelephone] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [lieuNaissance, setLieuNaissance] = useState('');
    const [adresse, setAdresse] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [focused, setFocused] = useState(false);
    const [cinError, setCinError] = useState('');
    const [telephoneError, setTelephoneError] = useState('');
    const [prenomError, setPrenomError] = useState('');


  


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
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
        id="name"
        name="nom"
        label="Nom"
        fullWidth
        variant="standard"
        value={name}
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
        name="dateDeNaissance"
        fullWidth
        type='date'
        variant="standard"
        value={dateNaissance}
        onChange={handleDateNaissanceChange}
      />

      <TextField
        margin="dense"
        id="lieuNaissance"
        name="lieuDeNaissance"
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
      <br />
      <h4 style={{ color: 'grey', fontSize: 'smaller' }}><em>(Optionnel)</em></h4>

  
      <Box component="section" sx={{ paddingBottom: "1px" }}>
                <SelectFiliere onFiliereSelect={onFiliereSelect} />
                
            </Box>
            <Box component="section" sx={{ paddingBottom: "1px" }}>
                <SelectElements onElementSelect={onElementSelect} filiereSelected={filiereSelected} />
            </Box>

    </>
  );
}

export default Field
