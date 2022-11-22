import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICompany, IEmployee} from '../models/IModel'

export const companyAPI = createApi({
    reducerPath: 'companyAPI',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: '/api'
        }
    ),
    endpoints: (build) => ({
        fetchCompany: build.query<ICompany[], number>({
            query: (limit) => ({url: '/company', params: {
                limit: limit
                }})
        }),
        fetchEmployees: build.query<IEmployee[], string>({
            query: (id) => `/company/${id}`
        })
    })
})

export const { useFetchCompanyQuery, useFetchEmployeesQuery } = companyAPI