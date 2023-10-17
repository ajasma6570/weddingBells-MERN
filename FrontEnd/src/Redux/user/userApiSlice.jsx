import {apiSlice} from '../apiSlice'
import Cookies from 'js-cookie'
const USER_URL = '/user'

const retrieveToken = Cookies.get("userDetails")
const jwtToken = retrieveToken ? retrieveToken : "";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        signup : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/userSignUp`,
                method: 'post',
                body : data
            })
        }),
        login : builder.mutation ({
            query : (data) => ({
                url : `${USER_URL}/userLogin`,
                method: 'post',
                body : data
            })
        }),
        mobileOTP : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/configOTP`,
                method: 'post',
                body: data
            })
        }),
        verifyOTP : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/CheckOTP`,
                method: 'post',
                body: data
            })
        }),
        resetPassword : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/resetPassword`,
                method:'PUT',
                body: data
            })
        }),
        createAccountOTP : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/createAccountOTP`,
                method: 'post',
                body: data
            })
        }),
        updateDetails: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/userDetailsUpdate`,
              method: 'PUT', // Change the HTTP method to PUT
              body: data,
            }),
          }),
        GetLoginUser : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/getUser`,
                method: 'get',
                params: data,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`, // Include JWT token in the Authorization header
                },
            })
        }),
        UserProfileAuth : builder.mutation ({
            query: (data) => ({
                url:`${USER_URL}/userProfileAuth`,
                method:'get',
                params:  data
            })
        }),
        VenueLists : builder.mutation ({
            query : (data) => ({
                url: `${USER_URL}/venueLists`,
                method: "get",
                params: DataTransfer
            })
        }),
        VehicleLists  :builder.mutation ({
            query : (data) => ({
                url: `${USER_URL}/vehicleLists`,
                method: 'get',
                params: data
            })
        }),
        CateringLists : builder.mutation ({
            query : (data) => ({
                url : `${USER_URL}/cateringLists`,
                method: "get",
                params: data
            })
        }),
        VenueDetails : builder.mutation ({
            query : (data) => ({
                 url:`${USER_URL}/venueDetails`,
                 method: "post",
                 body: data   
            })
        }),
        VehicleDetails : builder.mutation ({
            query : (data) => ({
                 url:`${USER_URL}/vehicleDetails`,
                 method: "post",
                 body: data   
            })
        }),
        cateringDetails : builder.mutation ({
            query : (data) => ({
                 url:`${USER_URL}/cateringDetails`,
                 method: "post",
                 body: data   
            })
        }),
        VenueAddTOCart : builder.mutation ({
            query : (data) => ({
                url: `${USER_URL}/venueAddtoCart`,
                method: 'post',
                body : data
            })
        }),
        VehicleAddtoCart : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/vehicleAddtoCart`,
                method: 'post',
                body : data
            })
        }),
        CateringAddtoCart : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/cateringAddtoCart`,
                method: 'post',
                body : data
            })
        }),
        CartDetials : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/getCartDetails`,
                method: 'post',
                body : data
            })
        }),
        CartItemRemove : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/cartRemoveItem`,
                method: 'post',
                body : data
            })
        }),
        PaymentOrder : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/UserPaymentOrders`,
                method: 'post',
                body : data
            })
        }),
        PaymentVerify : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/UserPaymentVerify`,
                method: 'post',
                body : data
            })
        }),
    })
    
})


export const {
    useSignupMutation,
    useLoginMutation,
    useMobileOTPMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
    useCreateAccountOTPMutation,
    useUpdateDetailsMutation,
    useGetLoginUserMutation,
    useUserProfileAuthMutation,
    useVenueListsMutation,
    useVehicleListsMutation,
    useCateringListsMutation,
    useVenueDetailsMutation,
    useVehicleDetailsMutation,
    useCateringDetailsMutation,
    useVenueAddTOCartMutation,
    useVehicleAddtoCartMutation,
    useCateringAddtoCartMutation,
    useCartDetialsMutation,
    useCartItemRemoveMutation,
    usePaymentOrderMutation,
    usePaymentVerifyMutation

} = userApiSlice;