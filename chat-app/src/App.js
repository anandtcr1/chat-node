import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Interview from './components/Interview';
import Login from './components/admin/login/Login';
import CreateUser from './components/admin/user/CreateUser';

function App() {

  const router = createBrowserRouter([
    { path: '/interview', element: <Interview /> },
    { path: '/', element: <Login /> },
    { path: '/create-user', element: <CreateUser /> }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
