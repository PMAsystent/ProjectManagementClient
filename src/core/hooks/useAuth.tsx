import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/auth/auth.slice';

const useAuth = () => {
  const accessToken = useSelector(selectAccessToken);
  return !!accessToken;
};

export default useAuth;
