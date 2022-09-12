import { createSlice } from '@reduxjs/toolkit'
import { IEmployee } from '../../interfaces/employees/employees.interfaces'
import { getEmployeeById } from '../asyncActions/employees.actions'

interface EmployeeDetailsState {
    isLoading: boolean
    employee: IEmployee | null
    error: string | null
}

const initialState: EmployeeDetailsState = {
    isLoading: true,
    employee: null,
    error: null,
}

export const employeeDetailsSlice = createSlice({
    name: 'employeeDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEmployeeById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getEmployeeById.fulfilled, (state, action) => {
            state.employee = action.payload
            state.isLoading = false
        })
        builder.addCase(getEmployeeById.rejected, (state, action) => {
            state.error = action.payload as string
            state.isLoading = false
        })
    },
})

export const employeeDetailsReducer = employeeDetailsSlice.reducer
