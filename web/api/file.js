import makeRequest from './request';

const fromApiTeam = ({ pk, ...rest }) => ({ ...rest, id: pk });
const toApiTeam = ({ id, ...rest }) => ({ ...rest, uuid: id });

export const getFiles = async (projectId) => {
  const response = await makeRequest('/files');
  const apiFiles = await response.json();
  return apiFiles.map((rest) => ({ ...rest, id: rest.pk }));
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
