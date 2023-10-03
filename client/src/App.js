import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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
import Analytics from "./components/shared/Layout/Dashboard/Analytics";
import DonorList from "./pages/Admin/DonorList";
import HospitalList from "./pages/Admin/HospitalList";
import OrganisationList from "./pages/Admin/OrganisationList";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <>
      <ToastContainer />
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
        <Route path="/analytics" element={
          <ProtectedRoutes>
            <Analytics />
          </ProtectedRoutes>} />
        <Route path="/admin" element={
          <ProtectedRoutes>
            <AdminHome />
          </ProtectedRoutes>} />
        <Route path="/donor-list" element={
          <ProtectedRoutes>
            <DonorList />
          </ProtectedRoutes>
        } />
        <Route path="/hospital-list" element={
          <ProtectedRoutes>
            <HospitalList />
          </ProtectedRoutes>
        } />
        <Route path="/organisation-list" element={
          <ProtectedRoutes>
            <OrganisationList />
          </ProtectedRoutes>
        } />
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
