import { jwtDecode } from 'jwt-decode';
export function userName() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token, 'shahriar123');

      console.log('decoded', decodedToken);

      const userNameFromToken = decodedToken.user.userName;

      return userNameFromToken;
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  }
}
