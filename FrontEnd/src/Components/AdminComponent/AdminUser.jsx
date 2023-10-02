import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAdminUserBlockMutation, useAdminUserDeleteMutation, useAdminUserListMutation } from '../../Redux/Admin/adminApiSlice';
import { toastError, toastSuccess } from '../toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userList } from '../../Redux/Admin/adminSlice';
import swalFire from '../../utils/SwalFire';

export default function AdminUser() {

  const [AdminUserList] = useAdminUserListMutation();
  const [AdminUserBlock] = useAdminUserBlockMutation();
  const [AdminUserDelete] = useAdminUserDeleteMutation();
  const [statusChange,setStatusChange] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state)=>state.rootReducer.admin.userDetails)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminUserList(); // Replace '/api/userList' with your API endpoint
        if(response.data.status === 200){
          const userDetails = response.data.userdetails;
          dispatch(userList(userDetails))
        }else{
          toastError(response.data.message)
          navigate('/admin/dash')
        }
       
      } catch (error) {
        // Handle any errors that occur during the API request.
        toastError(error)
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [AdminUserList,statusChange,navigate,dispatch]);

  const handleBlock = async(userId , userBlock) => {
    console.log(userBlock);
    const text = userBlock ? "Unblock this user" : "Block the user";   
     swalFire(text)
    .then(async(result)=>{
      if(result.isConfirmed){
        const res = await AdminUserBlock({userId})
        if(res.data.status === 200){
          toastSuccess(res.data.message)
          setStatusChange(!statusChange)
          return
        }else{
          toastError(res.data.message)
          return
        }
      }
    })
   
  }

  const handleDelete = async(userId) => {

    swalFire("Delete this User Account")
    .then(async(result)=>{
      if(result.isConfirmed){
        const res = await AdminUserDelete({userId})
        if(res.data.status === 200){
          toastSuccess(res.data.message)
          setStatusChange(!statusChange)
          return
        }else{
          toastError(res.data.message)
          return
        }
      }
    })
  }

  const handleEdit = (userId) => {
    navigate(`/admin/dash/userEdit/${userId}`,)
  }

  return (
    <div className='w-full px-4 md:w-10/12 md:mx-auto py-5'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg shadow-md'>
          <thead>
            <tr>
              <th className='p-3'>Image</th>
              <th className='p-3'>Name</th>
              <th className='p-3'>E-mail</th>
              <th className='p-3'>City</th>
              <th className='p-3'>Date of Join</th>
              <th className='p-3'>Status</th>
              <th className='p-3'>Edit</th>
              <th className='p-3'>Delete</th>
            </tr>
          </thead>
          <tbody>
          {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <h1 className='text-3xl py-10 font-semibold text-gray-400'>No User Found</h1>
                </td>
              </tr>
            ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td className='p-3 text-center'>
                  <img src={`/Assets/${user.image}`} alt='' className='w-10 h-10 mx-auto' />
                </td>
                <td className='p-3'>{user.name}</td>
                <td className='p-3'>{user.email}</td>
                <td className='p-3'>{user.city}</td>
                <td className='p-3'>
                  {new Date(user.CreatedAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className='p-3'>
                {!user.isBlocked &&  <button className='btn border border-black rounded-md px-3 bg-green-600 text-white font-semibold'
                onClick={()=>handleBlock(user._id, user.isBlocked)}
                >
                   Active
                   </button>
                   }
                   {user.isBlocked && <button className='btn border border-black rounded-md px-3 bg-red-600 text-white font-semibold'
                   onClick={()=>handleBlock(user._id, user.isBlocked)}
                   >
                    Blocked
                   </button>
                   }
                </td>
                <td className='p-3 cursor-pointer'
                onClick={()=>handleEdit(user._id)}
                >
                  <FontAwesomeIcon icon={faPen} color='blue' />
                </td>
                <td className='p-3 cursor-pointer'
                onClick={()=>handleDelete(user._id)}>
                  <FontAwesomeIcon icon={faTrash} color='red' />
                </td>
              </tr>
            ))
          )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
