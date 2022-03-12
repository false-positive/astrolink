import makeRequest from './request';

// const fromApiMilestone = ({ query_id, ...rest }) => ({ id: query_id, ...rest });
// const toApiMilestone = ({ id, ...rest }) => ({ query_id: id, ...rest });

export const getTasks = async (projectId, milestoneId) => {
  const response = await makeRequest(
    `/projects/${projectId}/milestones/${milestoneId}/tasks`
  );
  const apiTask = await response.json();
  return apiTask.map((rest, i) => ({ ...rest, id: i }));
};

export const setTasks = async (projectId, milestoneId, data) => {
  await makeRequest(`/projects/${projectId}/milestones/${milestoneId}/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      milestone: milestoneId,
    }),
  });
};
