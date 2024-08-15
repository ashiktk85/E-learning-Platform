import React, { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface AdminProtectorProps {
  children: ReactNode;
}

const AdminProtector: React.FC<AdminProtectorProps> = ({ children }) => {
    const navigate = useNavigate();
    const admin = useSelector((state : RootState) => state.admin)
  
    useEffect(() => {
      if (admin.adminInfo?.email === undefined) {
        navigate('/admin', {
          state: { message: 'Authorization failed' },
          replace: true,
        });
      }
    }, [navigate, admin]);
  
    return admin ? <>{children}</> : null;
  };
  
  export default AdminProtector;