import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

const MenuList = () => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Remove this line in the actual implementation

        const data = menuItem.items;
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []); 

  if (!menuData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
      <CircularProgress />
    </div>
    );
  }

  const navItems = menuData.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
