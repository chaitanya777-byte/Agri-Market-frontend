export const saveAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const getAuth = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
  };
};

export const clearAuth = () => {
  localStorage.clear();
};
