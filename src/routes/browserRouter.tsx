import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorPage from '../components/errorPage';
import Layout from '../components/layout';
import Redirect from '../components/layout/Redirect';
import NotFoundPage from '../components/notfoundPage';
import { webRoutes } from './web';
import loadable from '@loadable/component';
import ProgressBar from '../components/loader/progressBar';
import RequireAuth from './requireAuth';
import Login from '../components/auth/Login';
import About from '../components/demo-pages/about';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const Dashboard = loadable(() => import('../components/dashboard'), {
  fallback: fallbackElement,
});

const Users = loadable(() => import('../components/users'), {
  fallback: fallbackElement,
});

const Companies = loadable(() => import('../components/companies'), {
  fallback: fallbackElement,
});

const Categories = loadable(() => import('../components/categories'), {
  fallback: fallbackElement,
});

const Products = loadable(() => import('../components/products'), {
  fallback: fallbackElement,
});

const Units = loadable(() => import('../components/units'), {
  fallback: fallbackElement,
});

const Brands = loadable(() => import('../components/brands'), {
  fallback: fallbackElement,
});

const Quotations = loadable(() => import('../components/quotations'), {
  fallback: fallbackElement,
});

const PerformaInvoice = loadable(() => import('../components/performaInvoice'), {
  fallback: fallbackElement,
});

export const browserRouter = createBrowserRouter([
  {
    path: webRoutes.home,
    element: <Redirect />,
    errorElement: errorElement,
  },
  // auth routes
  {
    element: <AuthLayout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.login,
        element: <Login />,
      },
    ],
  },
  // protected routes
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.dashboard,
        element: <Dashboard />,
      },
      {
        path: webRoutes.users,
        element: <Users />,
      },
      {
        path: webRoutes.companies,
        element: <Companies />,
      },
      {
        path: webRoutes.categories,
        element: <Categories />,
      },
      {
        path: webRoutes.products,
        element: <Products />,
      },
      {
        path: webRoutes.units,
        element: <Units />,
      },
      {
        path: webRoutes.brands,
        element: <Brands />,
      },
      {
        path: webRoutes.quotations,
        element: <Quotations />,
      },
      {
        path: webRoutes.performaInvoice,
        element: <PerformaInvoice />,
      },
      {
        path: webRoutes.about,
        element: <About />,
      },
    ],
  },
  // 404
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: errorElement,
  },
]);