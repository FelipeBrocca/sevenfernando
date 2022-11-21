import axios from 'axios';

export const getUsersRequests = async () => await axios.get('/users')

export const createUsersRequests = async (user) => await axios.post('/users', user)

export const editUserRequest = async (id) => await axios.get(`/users/${id}`)

export const updateUserRequest = async (id, user) => await axios.put(`/users/${id}`, user)

export const eliminateUserRequest = async (id) => await axios.delete(`/users/${id}`)