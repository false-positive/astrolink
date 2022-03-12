import makeRequest from './request';

const fromApiProject = ({ uuid, ...rest }) => ({ id: uuid, ...rest });
const toApiProject = ({ id, ...rest }) => ({ uuid: id, ...rest });

export const getProject = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}`);
  const apiProject = await response.json();
  return fromApiProject(apiProject);
};

export const setProject = async (project) => {
  toApiProject(project);
};
