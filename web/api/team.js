import makeRequest from './request';

export const fromApiTeam = ({ uuid, ...rest }) => ({ ...rest, id: uuid });
export const toApiTeam = ({ id, ...rest }) => ({ ...rest, uuid: id });

export const getTeam = async (uuid) => {
  const response = await makeRequest(`/teams/${uuid}`);
  const apiTeam = await response.json();
  return fromApiTeam(apiTeam);
};

export const setTeam = async (team) => {
  let apiTeam = toApiTeam(team);
  const { uuid } = apiTeam;
  const response = await makeRequest(`/teams/${uuid}`, {
    method: 'PATCH',
    body: JSON.stringify(apiTeam),
  });
  if (response.ok) {
    apiTeam = await response.json();
    return fromApiTeam(team);
  }
  const errors = await response.json();
  throw errors;
};
