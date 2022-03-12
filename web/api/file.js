import makeRequest, { makeNonJsonRequest } from './request';

export const getFiles = async (projectId) => {
  const response = await makeRequest(`/projects/${projectId}/files`);
  const apiFiles = await response.json();
  return apiFiles.map((rest) => ({ ...rest, id: rest.pk }));
};

export const uploadFile = (projectId, file) => {
  const formdata = new FormData();
  formdata.append('name', file.name);
  formdata.append('project', projectId);
  formdata.append('file', file, file.name);
  formdata.append('extension', 'exe');

  return makeNonJsonRequest(`/projects/${projectId}/files`, {
    method: 'POST',
    body: formdata,
  });
};
