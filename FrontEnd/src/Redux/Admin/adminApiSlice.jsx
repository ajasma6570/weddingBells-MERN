import { apiSlice } from "./../apiSlice";

const ADMIN_URL = "/admin";

export const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    AdminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "post",
        body: data,
      }),
    }), 
    AdminUserList : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/adminUser`,
        method: 'get', 
        params: data,
      })
    }),
    AdminBusinessList : builder.mutation ({
      query : (data) => ({
        url: `${ADMIN_URL}/adminBusiness`,
        method: 'get',
        params: data,
      })
    }),
    AdminUserBlock : builder.mutation ({
      query: (data) => ({
      url: `${ADMIN_URL}/userBlock`,
      method: 'post',
      body : data

      })
    }),
    AdminUserDelete : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/userDelete`,
        method:'post',
        body: data
      })
    }),
    AdminUserDetail : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/userDetails`,
        method: 'post',
        body: data,
        
      })
    }),
    AdminUserEdit : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/userEdit`,
        method: 'post',
        body: data,
      })
    }),
    AdminUserDetialsEdit : builder.mutation ({
      query: (data) =>({
        url: `${ADMIN_URL}/userDetailsEdit`,
        method: 'post',
        body : data
      })
    }),
    AdminBusinessBlock : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/businessBlock`,
        method: 'post',
        body : data
      })
    }),
    AdminBusinessDelete : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/businessDelete`,
        method:'post',
        body: data
      })
    }),
    AdminBusinessDetails : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/businessDetails`,
        method: 'post',
        body: data
      })
    }),
    AdminBusinessAccDetailsEdit : builder.mutation ({
      query: (data) => ({
        url: `${ADMIN_URL}/businessAccDetailsEdit`,
        method:'post',
        body: data
      })
    }),
    AdminVenueRequestList : builder.mutation ({
      query : (data) => ({
        url:`${ADMIN_URL}/venueRequestList`,
        method : 'get',
        params : data
      })
    }),
    AdminVehicleRequestList : builder.mutation ({
      query : (data) => ({
        url:`${ADMIN_URL}/vehicleRequestList`,
        method : 'get',
        params : data
      })
    }),
    AdminCateringRequestList : builder.mutation ({
      query : (data) => ({
        url:`${ADMIN_URL}/cateringRequestList`,
        method : 'get',
        params : data
      })
    }),
    AdminCateringRequestHandle : builder.mutation ({
      query : (data) => ({
        url:`${ADMIN_URL}/cateringRequestHandle`,
        method: 'post',
        body : data
      })
    }),
    AdminVehicleRequestHandle : builder.mutation ({
      query : (data) => ({
        url:`${ADMIN_URL}/vehicleRequestHandle`,
        method: 'post',
        body : data
      })
    }),
    AdminVenueRequestHandle : builder.mutation ({
      query : (data) => ({
        url: `${ADMIN_URL}/venueRequestHandle`,
        method : 'post',
        body : data
      })
    })

  }),
});

export const { 
  useAdminLoginMutation,
useAdminUserListMutation,
useAdminBusinessListMutation,
useAdminUserBlockMutation,
useAdminUserDeleteMutation,
useAdminUserEditMutation,
useAdminUserDetailMutation,
useAdminUserDetialsEditMutation,
useAdminBusinessBlockMutation,
useAdminBusinessDeleteMutation,
useAdminBusinessDetailsMutation,
useAdminBusinessAccDetailsEditMutation,
useAdminVenueRequestListMutation,
useAdminVehicleRequestListMutation,
useAdminCateringRequestListMutation,
useAdminCateringRequestHandleMutation,
useAdminVehicleRequestHandleMutation,
useAdminVenueRequestHandleMutation


} = AdminApiSlice;
