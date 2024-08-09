import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Interview from './components/Interview';
import Login from './components/admin/login/Login';
import CreateUser from './components/admin/user/CreateUser';
import UserList from './components/admin/user/UserList';
import CreateQuestion from './components/admin/questions/CreateQuestion';
import QuestionsList from './components/admin/questions/QuestionsList';
import UserLogin from './components/user/login/UserLogin';
import UserDashboard from './components/user/dashboard/UserDashboard';

function App() {

  const router = createBrowserRouter([
    { path: '/interview', element: <Interview /> },
    { path: '/', element: <Login /> },
    { path: '/admin/create-user', element: <CreateUser /> },
    { path: '/admin/user-list', element: <UserList /> },
    { path: '/admin/question/create', element: <CreateQuestion /> },
    { path: '/admin/question/list', element: <QuestionsList /> },
    { path: '/user/login', element: <UserLogin />},
    { path: '/user/dashboard', element: <UserDashboard />}
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
