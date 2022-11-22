import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {sliceCompany} from "./slice";
import {ICompany, IEmployee} from "../../models/IModel";

export const editCompany = createAsyncThunk(
    'company/editCompany',
    async (params: ICompany, {rejectWithValue, dispatch}) => {
        try {
            await axios.put(`http://localhost:5000/company/${params.id}`, params)
            dispatch(sliceCompany.actions.editCompany(params))
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const deleteCompany = createAsyncThunk(
    'company/deleteCompany',
    async (params: string[], {rejectWithValue, dispatch}) => {
        try {
            if (params.length) {
                // нет возможности за раз все удалить !! незя удалять много записей сразу - крашнется сервак !!
                const deleteAll = params.map(id => axios.delete(`http://localhost:5000/company/${id}`))
                await Promise.all(deleteAll)
                dispatch(sliceCompany.actions.deleteCompany(params))
                // по идее эта часть на бэке должна делаться, по этому позволим сделать не самым красивым образом
                const allEmployees = await axios.get(`http://localhost:5000/employee?idCompany=${params.join('&idCompany=')}`)
                const deleteAllEmployees = allEmployees.data.map((item: IEmployee) => {
                    return axios.delete(`http://localhost:5000/employee/${item.id}`)
                })
                await Promise.all(deleteAllEmployees)
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const addCompany = createAsyncThunk(
    'company/addCompany',
    async (params: {name: string, address: string}, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.post('http://localhost:5000/company',
                {
                    ...params,
                    id: new Date().getTime().toString(),
                    employeesNumber: 0
                })
            dispatch(sliceCompany.actions.addCompany(response.data))
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const fetchCompany = createAsyncThunk(
    'company/fetchCompany',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/company')
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)