import api from "./axios";

export const getTags = (data) => {
  return api.post("/documentTags", data);
};

export const uploadDocument = (formData) => {
  return api.post("/saveDocumentEntry", formData);
};

export const searchDocuments = (data) => {
  return api.post("/searchDocumentEntry", data);
};