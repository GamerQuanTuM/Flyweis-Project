import axios from "axios";
const baseURL = "https://mamun-reza-freeshops-backend.vercel.app/api/v1";
const adminUrl = baseURL + "/admin";
const userUrl = baseURL + "/user";

export function axiosInstance(isFormData = false, isAdmin = true) {
  return axios.create({
    baseURL: isAdmin ? adminUrl : userUrl,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      Accept: "application/json",
    },
    timeout: 10000,
  });
}


export const axiosInstanceAdmin = axiosInstance(false, true);
export const axiosInstanceAdminWithFormData = axiosInstance(true, true);
export const axiosInstanceUser = axiosInstance(false, false);
export const axiosInstanceUserWithFormData = axiosInstance(true, false);