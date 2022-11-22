import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICompany} from "../../models/IModel";
import {addCompany, deleteCompany, editCompany, fetchCompany} from "./actions";

interface CompanyState {
    company: ICompany[]
    isLoading: boolean
    error: string | null
    selected: string[]
}

const initialState: CompanyState = {
    company: [],
    isLoading: false,
    error:  null,
    selected: []
}

export const sliceCompany = createSlice({
    name: "company",
    initialState,
    reducers: {
        addEmployeesNumber(state, action: PayloadAction<string>) {
            state.company.forEach(item => {
                if (item.id === action.payload) {
                    item.employeesNumber += 1
                }
            })
        },
        editCompany(state, action: PayloadAction<ICompany>) {
            state.company.forEach(item => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name
                    item.address = action.payload.address
                }
            })
        },
        addCompany(state, action: PayloadAction<ICompany>) {
            state.company.push(action.payload)
        },
        deleteCompany(state, action: PayloadAction<string[]>) {
            state.company = state.company.filter((item) => !action.payload.find(i => i === item.id))
            state.selected = []
        },
        select(state, action: PayloadAction<string>) {
            if (state.selected.find(i => i === action.payload) === undefined) {
                state.selected.push(action.payload)
            } else {
                state.selected = state.selected.filter((i) => i !== action.payload)
            }
        },
        selectAll(state) {
            if (state.selected.length !== state.company.length) {
                state.selected = state.company.map(item => item.id)
            } else {
                state.selected = []
            }
        }
    },
    extraReducers: {
        [fetchCompany.fulfilled.type]: (state, action: PayloadAction<ICompany[]>) => {
            state.isLoading = false
            state.error = null
            state.company = action.payload
        },
        [fetchCompany.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchCompany.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [addCompany.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        [deleteCompany.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        [editCompany.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export default sliceCompany.reducer