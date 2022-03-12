import makeRequest from './request';

//

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
    console.log(`SUCCESSFULLY LOGGED IN!!! `);
    console.log(await response.json());

    // return fromApiTeam(team);
  } else {
    const errors = await response.json();
    throw errors;
  }
};

export const register = async (data) => {
  const response = await makeRequest('/users', {
    method: 'POST',
    body: JSON.stringify(toApiUser(data)),
  });

  if (response.ok) {
    console.log('registery successful');
    login({ email: data.email, password: data.password });
    // console.log(await response.json());
    // apiTeam = await response.json();
    // return fromApiTeam(team);
  } else {
    const errors = await response.json();
    throw errors;
  }
};
