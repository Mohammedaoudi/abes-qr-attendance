/* eslint-disable prettier/prettier */
// assets
import { IconSchool, IconBook } from '@tabler/icons-react';




// constant
const icons = {
  IconSchool, IconBook
};

// // ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
// const fetchDataFromAPI = async () => {
//   try {
//     const response = await axios.get('http://localhost:3001/api1/v1/filieres/getAll');
//     const data = response.data; // Assuming your API returns JSON data
//     console.log(data.filiereList); // Do whatever you want with the data
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
// fetchDataFromAPI();








// const Formations = {

//   id: 'FORMATION INITIALE',
//   title: 'Formation Initiale',
//   caption: '',
//   type: 'group',
//   children: [
//     {
//       id: 'Années Préparatoire Au Cycle Ingénieur',
//       title: 'Années Préparatoire Au Cycle Ingénieur',
//       type: 'item',
//       url: '/Formations/2AP',
//       icon: icons.IconBook,

//     },
//     {
//       id: 'Cycle Ingénieur',
//       title: 'Cycle Ingénieur',
//       type: 'collapse',
//       icon: icons.IconSchool,

//       children: [
//         {
//           id: 'Ingénierie Informatique Et Technologies Emergentes (2ITE)',
//           title: 'Ingénierie Informatique Et Technologies Emergentes (2ITE)',
//           type: 'item',
//           url: '/Formations/IITE',
//         },
//         {
//           id: 'Ingénierie des Systèmes d’Information et de Communication (ISIC)',
//           title: 'Ingénierie des Systèmes d’Information et de Communication (ISIC)',
//           type: 'item',
//           url: '/Formations/ISIC',
//         },
//         {
//           id: 'Génie Énergétique et Électrique (G2E)',
//           title: 'Génie Énergétique et Électrique (G2E)',
//           type: 'item',
//           url: '/Formations/GEE',
//         },
//         {
//           id: 'Génie Industriel (GI)',
//           title: 'Génie Industriel (GI)',
//           type: 'item',
//           url: '/Formations/GI',
//         },
//         {
//           id: 'Génie Civil (GC)',
//           title: 'Génie Civil (GC)',
//           type: 'item',
//           url: '/Formations/GC',
//         },
//         {
//           id: 'Cybersécurité et Confiance Numérique (CCN)',
//           title: 'Cybersécurité et Confiance Numérique (CCN)',
//           type: 'item',
//           url: '/Formations/CCN',
//         }
//       ]
//     }
//   ]
// };

// export default Formations;
const token = localStorage.getItem('TOKEN');


const Formations = {
  id: 'FORMATION_INITIALE',
  title: 'Formation Initiale',
  caption: '',
  type: 'group',
  children: [] 
};

async function fetchDataAndPopulateFormations() {
  try {
    const response = await fetch('http://localhost:3001/api1/v1/filieres/getAll', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    const filieres = data.filiereList;
    console.log(filieres)

    filieres.forEach(item => {
      if (item.typeFiliere === 'CP') {
        Formations.children.push({
          id: item.nomFiliere,
          title: item.nomFiliere,
          type: 'item',
          url: `/admin/Formations/${item.shortNom}/${item._id}`,
          icon: icons.IconBook
        });
      } else if (item.typeFiliere === 'CI') {
        let cycleIngItem = Formations.children.find(child => child.id === 'Cycle Ingénieur');
        if (!cycleIngItem) {
          cycleIngItem = {
            id: 'Cycle Ingénieur',
            title: 'Cycle Ingénieur',
            type: 'collapse',
            icon: icons.IconSchool,
            children: []
          };
          Formations.children.push(cycleIngItem);
        }

        cycleIngItem.children.push({
          id: item.nomFiliere,
          title: item.nomFiliere,
          type: 'item',
          url: `/admin/Formations/${item.shortNom}/${item._id}`,
          icon: icons.IconBook
        });
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

  fetchDataAndPopulateFormations();

export default Formations;

