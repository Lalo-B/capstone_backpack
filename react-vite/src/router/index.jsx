import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
// import ImageForm from '../components/ImageForm/ImageForm';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import FlashcardsPage from '../components/FlashcardsPage';
import TestsPage from '../components/TestsPage/TestsPage';
import BackpackPage from '../components/BackpackPage';
import FlashcardSet from '../components/FlashcardSet';
import TestDetailsPage from '../components/TestDetailsPage';
import NewSetForm from '../components/NewSetForm/NewSetForm';
import NewTestForm from '../components/NewTestForm';
import EditSetPage from '../components/EditSetPage';
import EditTestPage from '../components/EditTestPage';
import Sockets from '../components/Sockets/Sockets';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "flashcards",
        children: [
          {
            path: ':id',
            element: <FlashcardSet />
          },
          {
            path: 'all',
            element: <FlashcardsPage />,
          },
          {
            path: 'new',
            element: <NewSetForm />
          },
          {
            path: 'edit/:id',
            element: <EditSetPage />
          }
        ]
      },
      {
        path: "tests",
        children: [
          {
            path: 'all',
            element: <TestsPage />,
          },
          {
            path: ':id',
            element: <TestDetailsPage />
          },
          {
            path: 'new',
            element: <NewTestForm />
          },
          {
            path: 'edit/:id',
            element: <EditTestPage />
          }
        ],
      },
      {
        path: "backpack",
        element: <BackpackPage />,
      },
      {
        path: 'messaging',
        element: <Sockets />
      }
    ],
  },
]);
