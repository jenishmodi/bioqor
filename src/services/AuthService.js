import apiRequest from 'utils/apiRequest';

const AuthService = {
  adminLogin: (email, password) =>
    new Promise(async (resolve, reject) => {
      try {
        const {
          data: {
            data: { token, ...otherData },
            message,
            status,
          },
        } = await apiRequest.post('/auth/login', {
          email,
          password,
        });
        localStorage.setItem('token', token);
        !status ? reject(message) : resolve(otherData);
      } catch (error) {
        reject(error);
      }
    }),
};

export default AuthService;
