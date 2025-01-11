/* eslint-disable prettier/prettier */
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import ProfilElv from "ui-component/Profiles/ProfilElv";


const ProfilEleve = () => {
    const { id } = useParams();
    return (

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>



            <ProfilElv id={id} />
        </Box>

    );
}

export default ProfilEleve;
