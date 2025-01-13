import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'


const baseQuery = fetchBaseQuery(
    {
        baseUrl: `${getBaseUrl()}/api/real-users`,
        credentials: 'include',
        prepareHeaders: (Headers) => {
            const token = localStorage.getItem('token')
            if (token){
                Headers.set("Authorization", `Bearer ${token}`)
            }
            return Headers;
        }
    }
)

const realUsersApi = createApi({
    reducerPath: "realUsersApi",
    baseQuery,
    tagTypes: ["RealUsers"],
    endpoints: (builder) => ({
        fetchAllRealUsers: builder.query({
            query: () => "/",
            providesTags: ["RealUsers"]
        }),
        fetchRealUserByUid: builder.query({
            query: (uid) => `/${uid}`,
            providesTags: (result, error, uid) => [{type: "RealUsers", uid}],
    
        }), 
        addRealUser: builder.mutation({
            query: (newRealUser) => ({
                url: "/create-real-user",
                method: "POST",
                body: newRealUser
            }),
            invalidatesTags: ["RealUsers"]
        }),
        updateRealUser: builder.mutation({
            query: ({uid, ...rest}) => ({
                url: `/edit/${uid}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["RealUsers"] 
        }),
        deleteRealUser: builder.mutation({
            query: (uid) => ({
                url: `/${uid}`,
                method: "DELETE"
            }),
            invalidatesTags: ["RealUsers"]
        })
    })
})

export const {useFetchAllRealUsersQuery, useFetchRealUserByUidQuery, useAddRealUserMutation, useUpdateRealUserMutation, useDeleteRealUserMutation} = realUsersApi
export default realUsersApi;