import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || "",
  user: {
    user_id: localStorage.getItem("user_id") || "",
    user_name: localStorage.getItem("user_name") || "",
    roles: JSON.parse(localStorage.getItem("roles")) || [],
  },

  login: (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("user_name", data.user_name);
    localStorage.setItem("roles", JSON.stringify(data.roles));

    set({
      token: data.token,
      user: {
        user_id: data.user_id,
        user_name: data.user_name,
        roles: data.roles,
      },
    });
  },

  logout: () => {
    localStorage.clear();

    set({
      token: "",
      user: {
        user_id: "",
        user_name: "",
        roles: [],
      },
    });
  },
}));

export default useAuthStore;