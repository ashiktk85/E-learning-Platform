import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProtectorProps {
  children: ReactNode;
}

const UserProtector: React.FC<UserProtectorProps> = ({ children }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!userToken) {
      navigate('/login', {
        state: { message: 'Authorization failed' },
        replace: true,
      });
    }
  }, [navigate, userToken]);

  return userToken ? <>{children}</> : null;
};

export default UserProtector;
