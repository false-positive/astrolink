import makeRequest from './request';

// const fromApiMilestone = ({ query_id, ...rest }) => ({ id: query_id, ...rest });
// const toApiMilestone = ({ id, ...rest }) => ({ query_id: id, ...rest });

export const getMilestones = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}/milestones`);
  const apiProject = await response.json();
  return apiProject.map((rest) => ({ ...rest, id: rest.query_id }));
};

export const setMilestones = async (projectId, data) => {
  await makeRequest(`/projects/${projectId}/milestones`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
