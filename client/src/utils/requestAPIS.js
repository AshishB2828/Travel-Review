import axios from 'axios'

const BASE_URL = 'https://travel-adviser-unni.herokuapp.com/api'

export const getAPI = async(url, token)=>{

    const response = await axios.get(`${BASE_URL}/${url}`, {headers:{Authorization: token}});
    return response
}   

export const postAPI = async(url,data, token)=>{
    const response = await axios.post(`${BASE_URL}/${url}`,data, {headers:{Authorization: `Bearer ${token}`}});
    return response
}
export const putAPI = async(url,data, token)=>{
    const response = await axios.put(`${BASE_URL}/${url}`,data, {headers:{Authorization: `Bearer ${token}`}});
    return response
}
export const deleteAPI = async(url, token)=>{
    const response = await axios.delete(`${BASE_URL}/${url}`, {headers:{Authorization: `Bearer ${token}`}});
    return response
}