import { webRoutes } from '../../routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import { UserOutlined, InfoCircleOutlined, AppstoreOutlined, ShopOutlined, TagsOutlined, ShoppingOutlined, AccountBookOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';

export const sidebar = [
  {
    path: webRoutes.dashboard,
    key: webRoutes.dashboard,
    name: 'Dashboard',
    icon: <BiHomeAlt2 />,
  },
  {
    path: webRoutes.users,
    key: webRoutes.users,
    name: 'Firm',
    icon: <UserOutlined />,
  },
  {
    path: webRoutes.companies,
    key: webRoutes.companies,
    name: 'Companies',
    icon: <ShopOutlined />,
  },
  {
    path: webRoutes.categories,
    key: webRoutes.categories,
    name: 'Categories',
    icon: <TagsOutlined />,
  },
  {
    path: webRoutes.products,
    key: webRoutes.products,
    name: 'Products',
    icon: <ShoppingOutlined />,
  },
  {
    path: webRoutes.units,
    key: webRoutes.units,
    name: 'Units',
    icon: <AppstoreOutlined />,
  },
  {
    path: webRoutes.brands,
    key: webRoutes.brands,
    name: 'Brands',
    icon: <AccountBookOutlined />,
  },
  {
    path: webRoutes.quotations,
    key: webRoutes.quotations,
    name: 'Quotations',
    icon: <FileTextOutlined />,
  },
  {
    path: webRoutes.performaInvoice,
    key: webRoutes.performaInvoice,
    name: 'Performa Invoices',
    icon: <FileTextOutlined />,
  },
  {
    path: webRoutes.users,
    key: webRoutes.users,
    name: 'Users',
    icon: <TeamOutlined />,
  },
  // {
  //   path: webRoutes.about,
  //   key: webRoutes.about,
  //   name: 'About',
  //   icon: <InfoCircleOutlined />,
  // },
];