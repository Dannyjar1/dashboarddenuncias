// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Usuarios',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Denuncias',
    path: '/dashboard/denuncias',
    icon: icon('ic_blog'),
  },
  {
    title: 'Control Admins',
    path: '/404',
    icon: icon('ic_admin'),
  },
 
];

export default navConfig;
