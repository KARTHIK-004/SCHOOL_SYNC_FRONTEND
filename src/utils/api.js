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

// User authentication API calls
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
    return response.data.data.user;
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

// School API calls
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

// Submit Form API calls
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

// Class API calls
export const createClass = async (className) => {
  try {
    const response = await api.post("/classes", { name: className });
    return response.data.data.class;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getClasses = async () => {
  try {
    const response = await api.get(`/classes`);
    return response.data.data.classes;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getClass = async (classId) => {
  try {
    const response = await api.get(`/classes/${classId}`);
    return response.data.data.class;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateClass = async (classId, updatedData) => {
  try {
    const response = await api.put(`/classes/${classId}`, updatedData);
    return response.data.data.class;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteClass = async (classId) => {
  try {
    await api.delete(`/classes/${classId}`);
    return true;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Section API calls
export const createSection = async (sectionData) => {
  try {
    const response = await api.post("/sections", sectionData);
    return response.data.data.section;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getSectionsByClassId = async (classId) => {
  try {
    const response = await api.get(`/sections/class/${classId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn(`No sections found for class ID: ${classId}`);
      return { data: { sections: [] } };
    }
    console.error("Error fetching sections by class ID:", error);
    throw error;
  }
};
export const getSections = async () => {
  try {
    const response = await api.get("/sections");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getSection = async (sectionId) => {
  try {
    const response = await api.get(`/sections/${sectionId}`);
    return response.data.data.section;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateSection = async (id, sectionData) => {
  try {
    const response = await api.put(`/sections/${id}`, sectionData);
    return response.data.data.section;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteSection = async (id) => {
  try {
    await api.delete(`/sections/${id}`);
    return true;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Parents API calls
export const createParent = async (parentData) => {
  try {
    const response = await api.post("/parents", parentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getParents = async () => {
  try {
    const response = await api.get(`/parents`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateParent = async (id, parentData) => {
  try {
    const response = await api.put(`/parents/${id}`, parentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getParent = async (id) => {
  try {
    const response = await api.get(`/parents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Student API calls
export const createStudent = async (studentData) => {
  try {
    const response = await api.post("/students/", studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudentProfile = async () => {
  try {
    const response = await api.get("/students/me");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateStudentProfile = async (id, data) => {
  try {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
