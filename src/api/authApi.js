import api from "./axios";

export const generateOTP = (data) => {
  return api.post("/generateOTP", data);
};

export const validateOTP = (data) => {
  return api.post("/validateOTP", data);
};