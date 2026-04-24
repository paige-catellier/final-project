export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-jwt-token" });
  });
};

export const register = (email, password, name) => {
  return new Promise((resolve) => {
    resolve({
      date: {
        email,
        password,
        name,
      },
    });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        email: "elise@example.com",
        name: "Elise",
        _id: "fake-user-id",
      },
    });
  });
};
