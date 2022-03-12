import Cookies from 'js-cookie';
import makeRequest from './request';

const toApiUser = ({ firstName, lastName, ...rest }) => ({
  ...rest,
  first_name: firstName,
  last_name: lastName,
});

export const login = async (data) => {
  const newData = {
    username: data.email,
    password: data.password,
  };
  const response = await makeRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(toApiUser(newData)),
  });

  if (response.ok) {
    const { token } = await response.json();
    Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
    console.log(response.status);
    if (response.status >= 200 && response.status < 300) return true;
    return false;
  }

  const errors = await response.json();
  return false;
  // throw errors;
};

export const register = async (data) => {
  const response = await makeRequest('/users', {
    method: 'POST',
    body: JSON.stringify(toApiUser(data)),
  });

  if (response.ok) {
    return login({ email: data.email, password: data.password });
  }
  const errors = await response.json();
  return false;
  // throw errors;
};
