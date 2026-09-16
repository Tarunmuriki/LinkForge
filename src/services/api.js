import axios from "axios";
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||"http://localhost:5001/api/v1",withCredentials:true});
let refreshing=null;
api.interceptors.response.use(r=>r,async err=>{const cfg=err.config;if(err.response?.status===401&&!cfg._retry&&!cfg.url.includes("/auth/refresh")){cfg._retry=true;refreshing??=api.post("/auth/refresh").finally(()=>refreshing=null);try{await refreshing;return api(cfg)}catch{}}return Promise.reject(err)});
export const unwrap=r=>r.data.data;
