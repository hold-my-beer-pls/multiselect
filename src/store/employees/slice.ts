import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addEmployee, fetchEmployee} from "./actions";
import {IEmployee} from "../../models/IModel";

interface EmployeeState {
    employee: IEmployee[]
    isLoading: boolean
    error: string | null
    selected: string[]
}

const initialState: EmployeeState = {
    employee: [],
    isLoading: false,
    error:  null,
    selected: []
}

export const sliceEmployee = createSlice({
    name: "employee",
    initialState,
    reducers: {
        deleteEmployee(state, action: PayloadAction<string[]>) {
            state.employee = state.employee.filter((item) => !action.payload.find(i => i === item.id))
            state.selected = []
        },
        addEmployee(state, action: PayloadAction<IEmployee>) {
            state.employee.push(action.payload)
        },
        select(state, action: PayloadAction<string>) {
            if (state.selected.find(i => i === action.payload) === undefined) {
                state.selected.push(action.payload)
            } else {
                state.selected = state.selected.filter((i) => i !== action.payload)
            }
        }
    },
    extraReducers: {
        [fetchEmployee.fulfilled.type]: (state, action: PayloadAction<IEmployee[]>) => {
            state.isLoading = false
            state.error = null
            state.employee = action.payload
        },
        [fetchEmployee.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchEmployee.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [addEmployee.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export default sliceEmployee.reducer