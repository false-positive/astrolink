import makeRequest from './request';

const getUser = async (token) => {
  const response = await makeRequest(`/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.json();
};

export default getUser;
