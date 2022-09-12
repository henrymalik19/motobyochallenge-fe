import { createSelector } from '@reduxjs/toolkit'
import { IEmployee } from '../../interfaces/employees/employees.interfaces'
import { RootState } from '../store'

export const selectEmployeeDetails = (state: RootState): IEmployee =>
    state.employeeDetails.employee as IEmployee

export const selectIsLoading = (state: RootState): boolean =>
    state.employeeDetails.isLoading

export const selectError = (state: RootState): string | null =>
    state.employeeDetails.error

export const selectEmployeeDetailsState = createSelector(
    selectEmployeeDetails,
    selectIsLoading,
    selectError,
    (employee, isLoading, error) => ({
        employee,
        isLoading,
        error,
    })
)
