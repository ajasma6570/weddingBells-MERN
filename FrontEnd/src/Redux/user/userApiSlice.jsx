import {apiSlice} from '../apiSlice'

const USER_URL = '/user'

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
                method:'post',
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
        updateDetails : builder.mutation ({
            query : (data) => ({
                url: `${USER_URL}/userDetailsUpdate`,
                method: 'post',
                body: data
            })
        })
       
    })
    
})


export const {
    useSignupMutation,
    useLoginMutation,
    useMobileOTPMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
    useCreateAccountOTPMutation,
    useUpdateDetailsMutation
} = userApiSlice;