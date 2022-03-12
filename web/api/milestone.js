import makeRequest from './request';

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
