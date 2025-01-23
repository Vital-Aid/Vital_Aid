import * as Yup from 'yup'

export const userSchema = Yup.object().shape({
    name: Yup.string().min(2).required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().min(10).max(10).required('Phone number is required'),
    password: Yup.string().min(8).required('Password is required'),
    conformPassword: Yup.string().oneOf([Yup.ref('password')], 'Password is not matching')
  });
  
  