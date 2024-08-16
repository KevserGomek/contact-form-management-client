import {
  Home,
  LoginPage,
  UsersPage,
  MessagesPage,
  NotAuthorizedPage,
  NotFoundPage,
  AddUserPage,
  UpdateUserPage,
  MessageDetailPage,
  ReportsPage
} from './pages';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import './reset.css'

const ProtectedRoute = ({ element, allowedRoles, userRole }) => {

  if (!userRole) return <NotAuthorizedPage />;
  if (allowedRoles && !allowedRoles.includes(userRole)) return <NotAuthorizedPage />;
  return element;
};

function App() {

  const { user, checked, handleLogout } = useAuth();
  // const navigate = useNavigate();
  // console.log(user)
  // useEffect(() => {
  //   if (checked) {
  //     console.log(checked)
  //     if (!user) {
  //       navigate('/login');
  //     }
  //   }
  // }, [checked,user, navigate]);

  return (

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={
          <ProtectedRoute
            element={<UsersPage />}
            allowedRoles={['admin']}
            userRole={user?.role}
          />
        } />
        <Route path="/user/add-reader" element={
          <ProtectedRoute
            element={<AddUserPage />}
            allowedRoles={['admin']}
            userRole={user?.role}
          />
        } />
        <Route path="/user/update/:id" element={
          <ProtectedRoute
            element={<UpdateUserPage />}
            allowedRoles={['admin']}
            userRole={user?.role}
          />
        } />
        <Route path="/messages" element={
          <ProtectedRoute
            element={<MessagesPage />}
            allowedRoles={['admin', 'reader']}
            userRole={user?.role}
          />
        } />
        <Route path="/message/:id" element={
          <ProtectedRoute
            element={<MessageDetailPage />}
            allowedRoles={['admin', 'reader']}
            userRole={user?.role}
          />
        } />
        <Route path="/reports" element={
          <ProtectedRoute
            element={<ReportsPage />}
            allowedRoles={['admin']}
            userRole={user?.role}
          />
        } />
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>

  );
}

export default App;
