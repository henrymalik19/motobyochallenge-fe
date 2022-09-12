import { useAuth0 } from '@auth0/auth0-react'
import CreatedResponse from '../helpers/responses/CreatedResponse'
import OKResponse from '../helpers/responses/OkResponse'
import {
    ICreateEmployeeDto,
    IEmployee,
    IUpdateEmployeeDto,
} from '../interfaces/employees/employees.interfaces'
import { httpClient } from './httpClient'

export const getAllEmployees = async (): Promise<IEmployee[]> => {
    const token = localStorage.getItem('token') as string

    const {
        data: { data },
    } = await httpClient.get<OKResponse<IEmployee[]>>('/api/employees', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    console.log({ data })
    return data as IEmployee[]
}

export const getEmployeeById = async (id: string): Promise<IEmployee> => {
    const token = localStorage.getItem('token') as string

    const {
        data: { data },
    } = await httpClient.get<OKResponse<IEmployee>>(`/api/employees/${id}`, {
        headers: {
            Authentication: `Bearer ${token}`,
        },
    })

    return data as IEmployee
}

export const createEmployee = async (
    createEmployeePayload: ICreateEmployeeDto
): Promise<IEmployee> => {
    const token = localStorage.getItem('token') as string

    const {
        data: { data },
    } = await httpClient.post<CreatedResponse<IEmployee>>('/api/employees', {
        headers: {
            Authentication: `Bearer ${token}`,
        },

        ...createEmployeePayload,
    })

    return data
}

export const updateEmployee = async (
    id: string,
    updateEmployeePayload: IUpdateEmployeeDto
): Promise<IEmployee> => {
    const { getAccessTokenSilently } = useAuth0()
    const token = await getAccessTokenSilently()

    const {
        data: { data },
    } = await httpClient.put<OKResponse<IEmployee>>(`/api/employees/${id}`, {
        headers: {
            Authentication: `Bearer ${token}`,
        },
        ...updateEmployeePayload,
    })

    return data as IEmployee
}

export const deleteEmployee = async (id: string): Promise<IEmployee> => {
    const { getAccessTokenSilently } = useAuth0()
    const token = await getAccessTokenSilently()

    const {
        data: { data },
    } = await httpClient.delete<OKResponse<IEmployee>>(`/api/employees/${id}`, {
        headers: {
            Authentication: `Bearer ${token}`,
        },
    })

    return data as IEmployee
}
