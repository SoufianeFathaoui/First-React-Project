import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HTML from "./pages/html";
import Css from "./pages/css";
import Javascript from "./pages/javascript";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {useContext} from 'react';
import ThemeProvider from './context/themeContext';
import ErrorPage from "./pages/Error_page";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/html",
    element: <HTML />,
  },
  {
    path: "/css",
    element: <Css />,
  },
  {
    path: "/javascript",
    element: <Javascript />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
]);

function App() {
  const {theme} = useContext(ThemeProvider)
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;