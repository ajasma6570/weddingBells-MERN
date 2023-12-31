import { apiSlice } from "../apiSlice";

const BUSINESS_URL = "/business";

export const businessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    BusinessSignup: builder.mutation({
      query: (data) => ({
        url: `${BUSINESS_URL}/BusinessSignUp`,
        method: "post",
        body: data,
      }),
    }),
    BusinessLogin: builder.mutation({
      query: (data) => ({
        url: `${BUSINESS_URL}/BusinessLogin`,
        method: "post",
        body: data,
      }),
    }),
    BusinessMobileOTP : builder.mutation ({
      query: (data) => ({
          url: `${BUSINESS_URL}/BusinessconfigOTP`,
          method: 'post',
          body: data
      })
    }),
    BusinessVerifyOTP : builder.mutation ({
        query: (data) => ({
            url: `${BUSINESS_URL}/BusinessCheckOTP`,
            method: 'post',
            body: data
        })
    }),
    BusinessResetPassword : builder.mutation ({
        query : (data) => ({
            url:`${BUSINESS_URL}/BusinessresetPassword`,
            method:'post',
            body: data
        })
    }),
    BusinessCreateAccountOTP : builder.mutation ({
      query : (data) => ({
          url:`${BUSINESS_URL}/BusinessCreateAccountOTP`,
          method: 'post',
          body: data
      })
  }),
  BusinessAccountUpdate : builder.mutation ({
    query : (data) => ({
      url:`${BUSINESS_URL}/BusinessAccountUpdate`,
      method:'post',
      body: data
    })
  }),
  BusinessVenueAdd : builder.mutation ({
    query : (data) => ({
      url: `${BUSINESS_URL}/BusinessVenueAdd`,
      method: 'post',
      body : data,
     
    })
  }),
  BusinessVehicleAdd : builder.mutation ({
    query: (data) => ({
      url: `${BUSINESS_URL}/BusinessVehicleAdd`,
      method: 'post',
      body : data
    })
  }),
  BusinessCateringAdd : builder.mutation ({
    query : (data) => ({
      url: `${BUSINESS_URL}/BuisnessCateringAdd`,
      method : 'post',
      body : data
    })
  }),
  BusinessProfileAuth : builder.mutation ({
    query : (data) => ({
      url:`${BUSINESS_URL}/BusinessProfileAuth`,
      method : 'get',
      params : data
    })
  }),
  BusienssRequestCheck : builder.mutation ({
    query: (data) => ({
      url:`${BUSINESS_URL}/BusinessRequestCheck`,
      method : "post",
      body : data
    })
  }),
  BusinessActiveService : builder.mutation ({
    query : (data) => ({
      url: `${BUSINESS_URL}/BusinessActiveServices`,
      method : 'post',
      body : data
    })
  })
  }),
});

export const { 
  useBusinessSignupMutation, 
  useBusinessLoginMutation,
  useBusinessMobileOTPMutation,
  useBusinessVerifyOTPMutation,
  useBusinessResetPasswordMutation,
  useBusinessCreateAccountOTPMutation,
  useBusinessAccountUpdateMutation,
  useBusinessVenueAddMutation,
  useBusinessVehicleAddMutation,
  useBusinessCateringAddMutation,
  useBusinessProfileAuthMutation,
  useBusienssRequestCheckMutation,
  useBusinessActiveServiceMutation
 
} =
  businessApiSlice;
