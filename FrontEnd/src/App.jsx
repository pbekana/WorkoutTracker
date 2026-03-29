import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Exercises from './pages/Exercises';
import Routines from './pages/Routines';
import RoutineBuilder from './pages/RoutineBuilder';
import WorkoutBuilder from './pages/WorkoutBuilder';
import ActiveWorkout from './pages/ActiveWorkout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const AuthenticatedLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 overflow-y-auto w-full h-screen">
      {children}
    </main>
  </div>
);

function App() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><AuthenticatedLayout><Dashboard /></AuthenticatedLayout></ProtectedRoute>} />
        <Route path="/routines" element={<ProtectedRoute><AuthenticatedLayout><Routines /></AuthenticatedLayout></ProtectedRoute>} />
        <Route path="/routines/new" element={<ProtectedRoute><AuthenticatedLayout><RoutineBuilder /></AuthenticatedLayout></ProtectedRoute>} />
        <Route path="/routines/:id" element={<ProtectedRoute><AuthenticatedLayout><RoutineBuilder /></AuthenticatedLayout></ProtectedRoute>} />
        <Route path="/workout/active" element={<ProtectedRoute><AuthenticatedLayout><ActiveWorkout /></AuthenticatedLayout></ProtectedRoute>} />
        <Route path="/exercises" element={<ProtectedRoute><AuthenticatedLayout><Exercises /></AuthenticatedLayout></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><AuthenticatedLayout><WorkoutBuilder /></AuthenticatedLayout></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
