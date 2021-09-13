import axios from 'axios'


export const getAPI = async(url, token)=>{

    const response = await axios.get(`/${url}`, {headers:{Authorization: token}});
    return response
}   

export const postAPI = async(url,data, token)=>{
    const response = await axios.post(`/${url}`,data, {headers:{Authorization: `Bearer ${token}`}});
    return response
}
export const putAPI = async(url,data, token)=>{
    const response = await axios.put(`/${url}`,data, {headers:{Authorization: `Bearer ${token}`}});
    return response
}
export const deleteAPI = async(url,data, token)=>{
    const response = await axios.delete(`/${url}`, {headers:{Authorization: `Bearer ${token}`}});
    return response
}