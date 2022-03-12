import Cookies from 'js-cookie';
import makeRequest from './request';

export const toApiUser = ({ firstName, lastName, ...rest }) => ({
  ...rest,
  first_name: firstName,
  last_name: lastName,
});
// eslint-disable-next-line camelcase
export const fromApiUser = ({ first_name, last_name, ...rest }) => ({
  ...rest,
  // eslint-disable-next-line camelcase
  firstName: first_name,
  // eslint-disable-next-line camelcase
  lastName: last_name,
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
    console.log(respons > e.status);
    if (response.status >= 200 && response.status < 300) return true;
    return false;
  }

  // const errors = await response.json();
  // throw errors;
  return false;
};

export const register = async (data) => {
  const response = await makeRequest('/users', {
    method: 'POST',
    body: JSON.stringify(toApiUser(data)),
  });

  if (response.ok) {
    return login({ email: data.email, password: data.password });
  }
  // const errors = await response.json();
  // throw errors;
  return false;
};
