import { configureStore } from '@reduxjs/toolkit'

// reducers
import { employeesReducer } from './slices/employees.slice'
import { employeeDetailsReducer } from './slices/employeeDetails.slice'

export const store = configureStore({
    reducer: {
        employees: employeesReducer,
        employeeDetails: employeeDetailsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
