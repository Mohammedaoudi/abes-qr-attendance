// assets
import { IconUser, IconPencil, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconUser,
  IconPencil,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const enseignatsEtudiants = {
  id: 'Collaboration Étudiant-Enseignant',
  title: 'Collaboration Étudiant-Enseignant',
  type: 'group',
  children: [
    {
      id: 'Enseignants',
      title: 'Enseignants',
      type: 'item',
      url: '/admin/Enseignants',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'Listes des élèves',
      title: 'Listes des élèves',
      type: 'item',
      url: '/admin/liste-éleves',
      icon: icons.IconPencil,
      breadcrumbs: false
    }]
};

export default enseignatsEtudiants;
