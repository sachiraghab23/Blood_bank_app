import { Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoutes from "./components/Routes/PublicRoutes";
import Donor from "./components/shared/Layout/Dashboard/Donor";
import Hospital from "./components/shared/Layout/Dashboard/Hospital";
import Organisation from "./components/shared/Layout/Dashboard/Organisation";
import Consumer from "./components/shared/Layout/Dashboard/Consumer";
import Donation from "./components/shared/Layout/Dashboard/Donation";

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={
        <ProtectedRoutes>
          <HomePage />
        </ProtectedRoutes>} />
        <Route path="/donor" element={
        <ProtectedRoutes>
          <Donor />
        </ProtectedRoutes>} />
        <Route path="/organisation" element={
        <ProtectedRoutes>
          <Organisation />
        </ProtectedRoutes>} />
        <Route path="/consumer" element={
        <ProtectedRoutes>
          <Consumer />
        </ProtectedRoutes>} />
        <Route path="/donation" element={
        <ProtectedRoutes>
          <Donation />
        </ProtectedRoutes>} />
        <Route path="/hospital" element={
        <ProtectedRoutes>
          <Hospital />
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
