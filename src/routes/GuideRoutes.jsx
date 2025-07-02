import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GuideDashboard from "../pages/guide/GuideDashboard";
import GuideOverview from "../pages/guide/GuideOverview";
import MyTours from "../pages/guide/MyTours";
import TourRequests from "../pages/guide/TourRequests";
import Chat from "../pages/guide/Chat";
import Reviews from "../pages/guide/Reviews";
import TourDetails from "../pages/guide/TourDetails";
import GuideProfile from "../pages/guide/GuideProfile";
import ProtectedRoute from "./ProtectedRoute";
import GuideSidebar from "../components/sidebars/GuideSidebar";

const GuideRoutes = () => (
  <>
    <GuideSidebar />
    <div
      style={{
        marginLeft: 240, // width of expanded sidebar
        transition: "margin-left 0.2s",
        minHeight: "100vh",
        background: "#f8fafc",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Routes>
        {/* Main Dashboard - using GuideDashboard as primary */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <GuideDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Alternative Overview page */}
        <Route
          path="overview"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <GuideOverview />
            </ProtectedRoute>
          }
        />

        {/* Tour Management */}
        <Route
          path="my-tours"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <MyTours />
            </ProtectedRoute>
          }
        />
        <Route
          path="tour-requests"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <TourRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="tours/:tourId"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <TourDetails />
            </ProtectedRoute>
          }
        />

        {/* Communication */}
        <Route
          path="chat"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="reviews"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <Reviews />
            </ProtectedRoute>
          }
        />

        {/* Profile Management */}
        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={["guide"]}>
              <GuideProfile />
            </ProtectedRoute>
          }
        />

        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/guide/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/guide/dashboard" replace />} />
      </Routes>
    </div>
  </>
);

export default GuideRoutes;
