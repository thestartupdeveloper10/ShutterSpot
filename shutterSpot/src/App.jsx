import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './pages/auth/AuthPage';
import photographerRoutes from './routes/photographerRoutes';
import clientRoutes from './routes/clientRoutes';

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const isPhotographer = currentUser?.role === 'photographer';

  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/auth" element={!currentUser ? <AuthPage /> : 
          isPhotographer ? <Navigate to="/photographer/dashboard" replace /> : 
          <Navigate to="/" replace />
        } />

        {/* Photographer Routes */}
        {photographerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((childRoute) => (
              <Route
                key={childRoute.path}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}

        {/* Client Routes */}
        {clientRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((childRoute) => (
              <Route
                key={childRoute.path}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}

        {/* Fallback Route */}
        <Route
          path="*"
          element={
            !currentUser ? (
              <Navigate to="/auth" replace />
            ) : isPhotographer ? (
              <Navigate to="/photographer/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
