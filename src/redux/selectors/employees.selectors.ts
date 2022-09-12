import { createSelector } from '@reduxjs/toolkit'
import { IEmployee } from '../../interfaces/employees/employees.interfaces'
import { RootState } from '../store'

export const selectEmployees = (state: RootState): IEmployee[] =>
    state.employees.employees

export const selectIsLoading = (state: RootState): boolean =>
    state.employees.isLoading

export const selectIsCreatingEmployee = (state: RootState): boolean =>
    state.employees.isCreatingEmployee

export const selectIsDeletingEmployee = (state: RootState): boolean =>
    state.employees.isDeletingEmployee
export const selectError = (state: RootState): string | null =>
    state.employees.error

export const selectEmployeesState = createSelector(
    selectEmployees,
    selectIsLoading,
    selectIsCreatingEmployee,
    selectIsDeletingEmployee,
    selectError,
    (employees, isLoading, isCreatingEmployee, isDeletingEmployee, error) => ({
        employees,
        isLoading,
        isCreatingEmployee,
        isDeletingEmployee,
        error,
    })
)
