import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'


const baseQuery = fetchBaseQuery(
    {
        baseUrl: `${getBaseUrl()}/api/quotes`,
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

const quotesApi = createApi({
    reducerPath: "quotesApi",
    baseQuery,
    tagTypes: ["Quotes"],
    endpoints: (builder) => ({
        fetchAllQuotes: builder.query({
            query: () => "/",
            providesTags: ["Quotes"]
        }),
        fetchQuoteById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: "Quotes", id}],
    
        }), 
        addQuote: builder.mutation({
            query: (newQuote) => ({
                url: "/create-quote",
                method: "POST",
                body: newQuote
            }),
            invalidatesTags: ["Quotes"]
        }),
        deleteQuote: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Quotes"]
        })
    })
})

export const {useFetchAllQuotesQuery, useAddQuoteMutation, useDeleteQuoteMutation, useFetchQuoteByIdQuery} = quotesApi
export default quotesApi;