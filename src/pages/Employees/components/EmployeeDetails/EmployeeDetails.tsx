/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
} from '../../../../redux/asyncActions/employees.actions'
import { selectEmployeeDetailsState } from '../../../../redux/selectors/employeeDetails.selector'
import { IUpdateEmployeeDto } from '../../../../interfaces/employees/employees.interfaces'
import { updateEmployeeSchema } from '../../../../schemas/employees.schema'

// components
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Loading } from '../../../../components/Loading'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export interface EmployeeDetailsProps {
    isOpen: boolean
    employeeId: string | null
    onClose: () => void
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = (props) => {
    const { isOpen, employeeId, onClose } = props

    const dispatch = useAppDispatch()
    const { employee, isLoading } = useAppSelector(selectEmployeeDetailsState)
    const [updateEmployeePayload, setUpdateEmployeePayload] =
        useState<IUpdateEmployeeDto>({
            firstName: '',
            middleInitial: '',
            lastName: '',
            dateOfBirth: '',
            dateOfEmployment: '',
        })

    useEffect(() => {
        if (employeeId !== null) {
            console.log({ employeeId })
            void dispatch(getEmployeeById(employeeId))
        }
    }, [employeeId])

    useEffect(() => {
        if (employee != null) {
            setUpdateEmployeePayload({
                firstName: employee.firstName,
                middleInitial: employee.middleInitial,
                lastName: employee.lastName,
                dateOfBirth: employee.dateOfBirth,
                dateOfEmployment: employee.dateOfEmployment,
            })
        }
    }, [employee])

    const handleUpdateEmployeePayload = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUpdateEmployeePayload({
            ...updateEmployeePayload,
            [e.target.id]: e.target.value,
        })
    }

    const handleSave = async (): Promise<void> => {
        if (
            updateEmployeePayload.dateOfBirth === '' ||
            updateEmployeePayload.dateOfEmployment === ''
        ) {
            toast.error('Invalid input please try again')
            return
        }

        if (typeof updateEmployeePayload.dateOfBirth !== 'string') {
            const dateOfBirth = updateEmployeePayload.dateOfBirth as any

            updateEmployeePayload.dateOfBirth = `${dateOfBirth.$y}-${(
                (dateOfBirth.$M as number) + 1
            )
                .toString()
                .padStart(2, '0')}-${dateOfBirth.$D
                .toString()
                .padStart(2, '0')}`
        }

        if (typeof updateEmployeePayload.dateOfEmployment !== 'string') {
            const dateOfEmployment =
                updateEmployeePayload.dateOfEmployment as any

            updateEmployeePayload.dateOfEmployment = `${dateOfEmployment.$y}-${(
                (dateOfEmployment.$M as number) + 1
            )
                .toString()
                .padStart(2, '0')}-${dateOfEmployment.$D
                .toString()
                .padStart(2, '0')}`
        }

        const result = await updateEmployeeSchema.safeParseAsync(
            updateEmployeePayload
        )

        if (result.success) {
            void dispatch(
                updateEmployee({
                    id: employee.id,
                    payload: updateEmployeePayload,
                })
            )
                .then(unwrapResult)
                .then(() => {
                    toast.success(
                        `Employee with id ${employee.id} updated successfully`
                    )
                    void dispatch(getAllEmployees())

                    onClose()
                })
        } else {
            toast.error('Invalid input. Please try again')
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            {isLoading && <Loading />}
            {!isLoading && (
                <>
                    <DialogTitle>Employee Details</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="firstName"
                                    label="First Name"
                                    type="text"
                                    variant="outlined"
                                    value={updateEmployeePayload.firstName}
                                    onChange={handleUpdateEmployeePayload}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="middleInitial"
                                    label="Initial"
                                    type="text"
                                    variant="outlined"
                                    value={updateEmployeePayload.middleInitial}
                                    onChange={handleUpdateEmployeePayload}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="lastName"
                                    label="Last Name"
                                    type="text"
                                    variant="outlined"
                                    value={updateEmployeePayload.lastName}
                                    onChange={handleUpdateEmployeePayload}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Date of Birth"
                                        value={
                                            updateEmployeePayload.dateOfBirth
                                        }
                                        onChange={(newValue) =>
                                            setUpdateEmployeePayload({
                                                ...updateEmployeePayload,
                                                dateOfBirth: newValue as string,
                                            })
                                        }
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Date of Employment"
                                        value={
                                            updateEmployeePayload.dateOfEmployment
                                        }
                                        onChange={(newValue) =>
                                            setUpdateEmployeePayload({
                                                ...updateEmployeePayload,
                                                dateOfEmployment:
                                                    newValue as string,
                                            })
                                        }
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}
