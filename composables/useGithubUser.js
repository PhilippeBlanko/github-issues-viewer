import { useCookie } from '#app';
import axios from "axios";

export const useGithubUser = () => {
  const userInfo = useCookie('user_info');
  const isAuthenticated = useCookie('is_authenticated');

  const setUser = async (token) => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
        },
      });

      userInfo.value = response.data;
      console.log(userInfo)
      isAuthenticated.value = true;
    } catch (err) {
      console.error('Erreur:', err.response?.data?.message || err.message);
    }
  };

  const logout = () => {
    userInfo.value = null;
    isAuthenticated.value = false;
  };

  const getUser = () => {
    return userInfo.value;
  };

  const checkAuthenticated = () => {
    return isAuthenticated.value;
  };

  return { setUser, logout, getUser, checkAuthenticated };
}
