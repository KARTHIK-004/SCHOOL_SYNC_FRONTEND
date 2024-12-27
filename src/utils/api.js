import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signIn = async (email, password) => {
  try {
    const response = await api.post(`/users/signin`, { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signUp = async (name, email, password, userType) => {
  try {
    const response = await api.post(`/users/signup`, {
      name,
      email,
      password,
      userType,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.post(`/users/logout`);
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    if (response.data.status === "success" && response.data.data.user) {
      return response.data.data.user;
    } else {
      throw new Error("User data not found in the response");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
        return null;
      }
    }
    throw error;
  }
};

export const createSchool = async (formData) => {
  try {
    const response = await api.post(`/schools/create`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getSchools = async () => {
  try {
    const response = await api.get(`/schools/list`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post(`/contact/submit`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getContactSubmissions = async () => {
  try {
    const response = await api.get(`/contact/submissions`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
