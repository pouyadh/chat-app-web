import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from 'store/selector';

export default function (to: string) {
  const userData = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    if (!!userData) navigate(to);
  }, [userData, navigate]);
}
