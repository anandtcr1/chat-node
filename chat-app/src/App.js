import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Interview from './components/Interview';

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Interview /> }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
