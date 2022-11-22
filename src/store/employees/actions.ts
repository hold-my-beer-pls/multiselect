import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {sliceCompany} from "../companies/slice";
import {IEmployee} from "../../models/IModel";
import {sliceEmployee} from "./index";


export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (params: string[], {rejectWithValue, dispatch}) => {
        try {
            const deleteAll = params.map((id) => axios.delete(`http://localhost:5000/employee/${id}`))
            await Promise.all(deleteAll)
            dispatch(sliceEmployee.actions.deleteEmployee(params))
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (params: IEmployee, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.post('http://localhost:5000/employee/',
                {
                    ...params,
                    id: new Date().getTime().toString()
                })
            // dispatch(sliceEmployee.actions.addEmployee(response.data))
            // по идее эта часть на бэке должна делаться, по этому позволим сделать не самым красивым образом
            const responseCompany = await axios.get(`http://localhost:5000/company/${params.idCompany}` )
            await axios.put(`http://localhost:5000/company/${params.idCompany}`,
                {...responseCompany.data, employeesNumber: ++responseCompany.data.employeesNumber}
            )
            dispatch(sliceCompany.actions.addEmployeesNumber(params.idCompany))
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',
    async (params: {companyIds: string[]}, {rejectWithValue}) => {
        try {
            const {companyIds} = params
            if (companyIds.length) {
                const response = await axios.get(`http://localhost:5000/employee?idCompany=${companyIds.join('&idCompany=')}`)
                return response.data
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)