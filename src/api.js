// src/config/api.js
const API_URL = process.env.REACT_APP_API_URL;

// export const API_ENDPOINTS = {
//     SIGN_IN: `${API_URL}/auth/login`,
//     SIGN_UP: `${API_URL}/auth/sign-up`,
// };
export const API_ENDPOINTS = {
    SIGN_IN: '/api/v1/auth/login',
    SIGN_UP: '/api/v1/auth/sign-up'
};
export default API_ENDPOINTS;