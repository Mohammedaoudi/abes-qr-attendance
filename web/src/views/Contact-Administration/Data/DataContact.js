/* eslint-disable prettier/prettier */

function createData(
  name,
  role,
  emailX,
  telephoneX
) {
  return {
    name,
    role,
    contact: [
      {
        telephone: telephoneX,
        email:emailX,
      }
    ],
  };
}
export const rows=[
  createData('PR MAHMOUD EL MOUDEN', 'Directeur adjoint chargé des affaires pédagogiques', 'elmouden.m@ucd.ac.ma','05 23 34 48 22'),
  createData('PR AZIZ DAHBI', 'Directeur adjoint chargé de la recherche scientifique et de la coopération','dahbi.a@ucd.ac.ma','05 23 34 48 22'),
  createData('PR MOHAMED EL JOURMI', 'Coordinateur de la filière ISIC', 'eljourmi.m@ucd.ac.ma','05 23 39 49 15 – 05 23 34 48 22'),
  createData('PR ABDERRAHIM BOUTAHAR', 'Coordinateur de la filière G2E','boutahar.fsac@gmail.com','05 23 34 48 22'),
  createData('PR MOUNIA ACHAK', 'Coordinatrice de la Filière GI', 'achak_mounia@yahoo.fr','05 23 39 56 79 – 05 23 34 48 22'),
  createData('PR CHAFIK BAIDADA', 'Coordinateur de la Filière 2ITE','baidada.c@ucd.ac.ma','05 23 39 49 15 - 05 23 34 48 22'),
  createData('PR SAFAA ASSIF', 'Coordinatrice de la Filière GC', 'safaa.assif@gmail.com','05 23 39 56 79 – 05 23 34 48 22'),
  createData('PR ABDELILAH KADDARR', 'Coordinateur des deux années préparatoires', 'a.kaddar@yahoo.f','05 23 39 56 79'),
  createData('PR ALI KARTIT', 'Coordinateur de la filière CCN', 'kartit.a@ucd.ac.ma','05 23 39 56 79 – 05 23 34 48 22'),
];