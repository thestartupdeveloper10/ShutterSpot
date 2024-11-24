import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';

const ClientLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Redirect to auth if not logged in
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect photographers to their dashboard
  if (currentUser.role === 'photographer') {
    return <Navigate to="/photographer/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
