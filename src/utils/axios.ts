// import axios from "axios";
// import Cookies from 'js-cookie';

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//       "Content-Type": "application/json",
      
//     },
//   });

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const userCookie = Cookies.get("accessToken");
//       if (userCookie) {
//         const user = JSON.parse(userCookie);
        
        
//         if (user) {
//           config.headers.Authorization = `Bearer ${userCookie}`;
//         }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   export default axiosInstance;
import axios from "axios";
import Cookies from 'js-cookie';


const token= Cookies.get("accessToken");

console.log(token);
const axiosInstance=axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export default axiosInstance;