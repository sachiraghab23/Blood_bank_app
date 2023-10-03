import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
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
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>} />
        <Route path="/donor-list" element={
          <ProtectedRoute>
            <DonorList />
          </ProtectedRoute>
        } />
        <Route path="/hospital-list" element={
          <ProtectedRoute>
            <HospitalList />
          </ProtectedRoute>
        } />
        <Route path="/organisation-list" element={
          <ProtectedRoute>
            <OrganisationList />
          </ProtectedRoute>
        } />
        <Route path="/hospital" element={
          <ProtectedRoute>
            <Hospital />
          </ProtectedRoute>} />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>} />
        <Route path="/consumer" element={
          <ProtectedRoute>
            <Consumer />
          </ProtectedRoute>} />
        <Route path="/donation" element={
          <ProtectedRoute>
            <Donation />
          </ProtectedRoute>} />
        <Route path="/organisation" element={
          <ProtectedRoute>
            <Organisation />
          </ProtectedRoute>} />
        <Route path="/donor" element={
          <ProtectedRoute>
            <Donor />
          </ProtectedRoute>} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
