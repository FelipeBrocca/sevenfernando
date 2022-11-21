import { useState, createContext, useContext, useEffect } from "react";
import { getUsersRequests, 
         createUsersRequests, 
         editUserRequest,
         eliminateUserRequest, 
         updateUserRequest
        } from "../api/users";


const UsersContext = createContext()

export const useUsers = () => {
    const context = useContext(UsersContext);
    return context;
}

export const UsersProvider = ({children}) => {
    
         const [users, setUsers] = useState([])

         const getUsers = async () => {
          const res = await getUsersRequests()
          setUsers(res.data)
         }

         const createUser = async (user) => {
          const create = await createUsersRequests(user)
          if(create){
            setUsers([...users, create.data])
          } else {
            alert('Error')
          }
         }

         const getEditUser = async (id) => {
          const userToEdit = await editUserRequest(id)
          return userToEdit.data;
         }

         const updateUser = async (id, user) => {
           const userEdited = await updateUserRequest(id, user)
           setUsers(users.map((user) => (user._id === id ? userEdited : user)))
         }

         const eliminateUser = async (id) => {
          await eliminateUserRequest(id)
          setUsers(users.filter(user => user._id !== id))
         }

         useEffect(() => {
          getUsers()
         }, [])


      return (
        <UsersContext.Provider value={{
          users, 
          setUsers,
          getUsers,
          createUser,
          getEditUser,
          eliminateUser,
          updateUser
        }} >
          {children}
      </UsersContext.Provider>
      )
}