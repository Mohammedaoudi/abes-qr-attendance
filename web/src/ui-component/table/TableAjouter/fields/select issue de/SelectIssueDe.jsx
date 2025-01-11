import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectIssueDe = ({ onIssueDeSelect }) => {
    const [issue, setIssue] = useState('');

    const handleChange = (event) => {
        const selectedIssue = event.target.value;
        setIssue(selectedIssue);
        console.log(selectedIssue); // Log the selected issue
        // Call the onIssueDeSelect function with the selected issue as argument
        onIssueDeSelect(selectedIssue);
    };

    return (
        <div style={{ width: '100%', maxWidth: 400 }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Issue de</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={issue}
                    onChange={handleChange}
                    label="Issue de"
                >
                    {/* Set unique values for each MenuItem */}
                    <MenuItem value="2AP">2AP</MenuItem>
                    <MenuItem value="CNC">CNC</MenuItem>
                    <MenuItem value="BAC">BAC</MenuItem>
                    <MenuItem value="PASSERELLE">PASSERELLE</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectIssueDe;
