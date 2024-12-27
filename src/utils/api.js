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

export const fetchClasses = async () => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    { id: "1", name: "Class 5", sections: 3, students: 120 },
    { id: "2", name: "Class 6", sections: 2, students: 80 },
    { id: "3", name: "Class 7", sections: 4, students: 160 },
    { id: "4", name: "Class 8", sections: 3, students: 115 },
  ];
};

export const fetchSections = async () => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    "Class 5": [
      { id: "1", name: "5A", teacher: "Ms. Sarah", students: 40 },
      { id: "2", name: "5B", teacher: "Mr. John", students: 38 },
      { id: "3", name: "5C", teacher: "Ms. Emily", students: 42 },
    ],
    "Class 6": [
      { id: "4", name: "6A", teacher: "Mr. Smith", students: 35 },
      { id: "5", name: "6B", teacher: "Ms. Johnson", students: 45 },
    ],
    "Class 7": [
      { id: "6", name: "7A", teacher: "Mr. Brown", students: 40 },
      { id: "7", name: "7B", teacher: "Ms. Davis", students: 38 },
      { id: "8", name: "7C", teacher: "Mr. Wilson", students: 42 },
      { id: "9", name: "7D", teacher: "Ms. Taylor", students: 40 },
    ],
    "Class 8": [
      { id: "10", name: "8A", teacher: "Mr. Anderson", students: 38 },
      { id: "11", name: "8B", teacher: "Ms. Thomas", students: 40 },
      { id: "12", name: "8C", teacher: "Mr. Jackson", students: 37 },
    ],
  };
};
