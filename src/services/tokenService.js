// tokenService.js
const TOKEN_KEY = 'app_token';

const TokenService = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  hasToken: () => {
    return !!TokenService.getToken();
  },
};

export default TokenService;
