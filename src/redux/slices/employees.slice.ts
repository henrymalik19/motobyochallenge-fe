import { createSlice } from '@reduxjs/toolkit'
import { IEmployee } from '../../interfaces/employees/employees.interfaces'
import {
    getAllEmployees,
    deleteEmployee,
    createEmployee,
    updateEmployee,
} from '../asyncActions/employees.actions'

interface EmployeeState {
    isLoading: boolean
    isDeletingEmployee: boolean
    isCreatingEmployee: boolean
    isUpdatingEmployee: boolean
    employees: IEmployee[]
    error: string | null
}

const initialState: EmployeeState = {
    isLoading: true,
    isDeletingEmployee: false,
    isCreatingEmployee: false,
    isUpdatingEmployee: false,
    employees: [],
    error: null,
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllEmployees.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAllEmployees.fulfilled, (state, action) => {
            state.isLoading = false
            state.employees = action.payload
        })
        builder.addCase(getAllEmployees.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
        builder.addCase(createEmployee.pending, (state) => {
            state.isCreatingEmployee = true
        })
        builder.addCase(createEmployee.fulfilled, (state) => {
            state.isCreatingEmployee = false
        })
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.isCreatingEmployee = false
            state.error = action.payload as string
        })
        builder.addCase(updateEmployee.pending, (state) => {
            state.isUpdatingEmployee = true
        })
        builder.addCase(updateEmployee.fulfilled, (state) => {
            state.isUpdatingEmployee = false
        })
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.isUpdatingEmployee = false
            state.error = action.payload as string
        })
        builder.addCase(deleteEmployee.pending, (state) => {
            state.isDeletingEmployee = true
        })
        builder.addCase(deleteEmployee.fulfilled, (state) => {
            state.isDeletingEmployee = false
        })
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.isDeletingEmployee = false
            state.error = action.payload as string
        })
    },
})

export const employeesReducer = employeesSlice.reducer
