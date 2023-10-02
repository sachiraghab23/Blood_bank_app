import { Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoutes from "./components/Routes/PublicRoutes";

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={
        <ProtectedRoutes>
          <HomePage />
        </ProtectedRoutes>} />
        <Route path="/login" element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        } />
        <Route path="/register" element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        } />
      </Routes>
    </>
  );
}

export default App;
