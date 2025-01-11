/* eslint-disable prettier/prettier */
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import ProfilProf from '../../ui-component/Profiles/ProfilProf'


const ProfilProfesseur = () => {
    const { id } = useParams();
    return (

        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>



            <ProfilProf id={id} />
        </Box>

    );
}

export default ProfilProfesseur;
