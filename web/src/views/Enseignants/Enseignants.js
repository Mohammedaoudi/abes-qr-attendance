/* eslint-disable prettier/prettier */

//**********************import react*************************//
import { lazy } from 'react';



//**********************import project*************************//
import Loadable from '../../ui-component/Loadable';


const Enseignants = () => {
  const LazyLoadedComponent = Loadable(lazy(() => import('../../ui-component/table/TableCrudProf')));


  return (
    <div style={{ height: 450, width: '100%', marginBottom: '40px', paddingBottom: '20px' }}>
      < LazyLoadedComponent />
   
    </div>
  );
};

export default Enseignants;
