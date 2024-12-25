import { useCookie } from '#app';

export const withoutAxios_useGithubUser = () => {
  const userInfo = useCookie('user_info');
  const isAuthenticated = useCookie('is_authenticated');

  const setUser = async (token) => {
    try {
      const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      const userData = await response.json();
      userInfo.value = userData;
      isAuthenticated.value = true;
    } catch (err) {
      console.error('Erreur:', err);
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
