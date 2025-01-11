// assets
import { IconPhone, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconPhone, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'Contact',
      title: 'Contact Administartion',
      type: 'item',
      url: '/admin/Contact',
      icon: icons.IconPhone,
      breadcrumbs: false
    },
    {
      id: 'About Us',
      title: 'About Us',
      type: 'item',
      url: '/admin/About',
      icon: icons.IconHelp,
     
    }
  ]
};

export default other;
