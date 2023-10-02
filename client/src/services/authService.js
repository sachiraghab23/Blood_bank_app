export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    console.log("login", e, email, password, role);
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  organisationName,
  hospitalName,
  phone,
  email,
  website,
  address,
  password
) => {
  e.preventDefault();
  try {
    console.log(
      "register",
      e,
      name,
      organisationName,
      hospitalName,
      phone,
      email,
      website,
      address,
      password
    );
  } catch (error) {
    console.log(error);
  }
};
