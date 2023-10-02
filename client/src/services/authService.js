import { userLogin, userRegister } from '../redux/features/auth/authActions';
import store from './../redux/store';
export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if(!role || !email || !password){
      return alert('Please provide all fields');
    }
    store.dispatch(userLogin({email,password,role}));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  role,
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
    store.dispatch(userRegister(
      {name,
      role,
      organisationName,
      hospitalName,
      phone,
      email,
      website,
      address,
      password}
    ));
  } catch (error) {
    console.log(error);
  }
};
