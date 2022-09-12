import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorHandler } from '../../helpers/errorHandler'
import {
    ICreateEmployeeDto,
    IUpdateEmployeeDto,
} from '../../interfaces/employees/employees.interfaces'
import * as employeesService from '../../services/employees.service'

export const getAllEmployees = createAsyncThunk(
    'employees/getAllEmployees',
    async (_, { rejectWithValue }) => {
        try {
            const employees = await employeesService.getAllEmployees()
            return employees
        } catch (error: any) {
            return rejectWithValue(errorHandler(error))
        }
    }
)

export const getEmployeeById = createAsyncThunk(
    'employees/getEmployeeById',
    async (id: string, { rejectWithValue }) => {
        try {
            const employee = await employeesService.getEmployeeById(id)
            return employee
        } catch (error: any) {
            return rejectWithValue(errorHandler(error))
        }
    }
)

export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    async (payload: ICreateEmployeeDto, { rejectWithValue }) => {
        try {
            await employeesService.createEmployee(payload)
        } catch (error: any) {
            return rejectWithValue(errorHandler(error))
        }
    }
)

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (
        data: { id: string; payload: IUpdateEmployeeDto },
        { rejectWithValue }
    ) => {
        try {
            await employeesService.updateEmployee(data.id, data.payload)
        } catch (error: any) {
            return rejectWithValue(errorHandler(error))
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (id: string, { rejectWithValue }) => {
        try {
            await employeesService.deleteEmployee(id)
        } catch (error: any) {
            return rejectWithValue(errorHandler(error))
        }
    }
)
