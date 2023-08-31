import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from 'store/selector';

export default function useRequireUser() {
  const userData = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) navigate('/auth/signin');
  }, [userData, navigate]);
  return userData;
}
