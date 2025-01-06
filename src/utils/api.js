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
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
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
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
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
    localStorage.removeItem("user");
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
export const createClass = async (classData) => {
  try {
    const response = await api.post("/classes", classData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const response = await api.put(`/classes/${id}`, classData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getClasses = async () => {
  try {
    const response = await api.get("/classes");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getClassById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Section API calls
export const createSection = async (sectionData) => {
  try {
    console.log("Creating section with data:", sectionData);
    const response = await api.post("/sections", sectionData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating section:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const updateSection = async (id, sectionData) => {
  try {
    console.log("Updating section with data:", sectionData);
    const { _id, ...dataToSend } = sectionData;
    const response = await api.put(`/sections/${id}`, dataToSend);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating section:",
      error.response?.data || error.message
    );
    console.error("Full error object:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getSectionById = async (id) => {
  try {
    const response = await api.get(`/sections/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching section:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getSectionsByClassId = async (classId) => {
  try {
    const response = await api.get(`/sections/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sections by class ID:",
      error.response?.data || error.message
    );
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

export const deleteSection = async (id) => {
  try {
    const response = await api.delete(`/sections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudentsBySection = async (sectionId) => {
  try {
    const response = await api.get(`/students/section/${sectionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students by section:", error);
    throw error;
  }
};

// Parent API calls
export const createParent = async (parentData) => {
  try {
    const response = await api.post("/parents", parentData);
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

export const getParents = async () => {
  try {
    const response = await api.get("/parents");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getParentById = async (id) => {
  try {
    const response = await api.get(`/parents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteParent = async (id) => {
  try {
    const response = await api.delete(`/parents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Student API calls
export const createStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateStudentProfile = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createTeacher = async (teacherData) => {
  try {
    const response = await api.post("/teachers", teacherData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating teacher:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const updateTeacherProfile = async (id, teacherData) => {
  try {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating teacher:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating teacher:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await api.get("/departments");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching departments:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching teacher:",
      error.response?.data || error.message
    );
    throw error.response ? error.response.data : error;
  }
};
