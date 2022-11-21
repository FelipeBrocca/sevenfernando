import axios from 'axios';

export const getUsersRequests = async () => await axios.get('https://sevenfernandoapi.onrender.com/users')

export const createUsersRequests = async (user) => await axios.post('https://sevenfernandoapi.onrender.com/users', user)

export const editUserRequest = async (id) => await axios.get(`https://sevenfernandoapi.onrender.com/users/${id}`)

export const updateUserRequest = async (id, user) => await axios.put(`https://sevenfernandoapi.onrender.com/users/${id}`, user)

export const eliminateUserRequest = async (id) => await axios.delete(`https://sevenfernandoapi.onrender.com/users/${id}`)