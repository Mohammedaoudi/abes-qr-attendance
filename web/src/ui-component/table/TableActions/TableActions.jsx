/* eslint-disable prettier/prettier */

//**********************import react*************************//

//**********************import mui*************************//
import { Box } from '@mui/material';

//**********************import project*************************//

import Action from './Actions/Action';






const TableActions = ({ params }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Action Action="plus d'informations" params={params} />
            <Action Action="Modifier les informations" params={params} />
            <Action Action="Supprimer" params={params} />
        </Box>
    );
}

export default TableActions;


