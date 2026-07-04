import api from "./axios";

export const getTags = (term = "") => {
  return api.post("/documentTags", {
    term,
  });
};

export const uploadDocument = (formData) => {
  return api.post("/saveDocumentEntry", formData);
};

export const searchDocuments = (data) => {
  return api.post("/searchDocumentEntry", data);
};