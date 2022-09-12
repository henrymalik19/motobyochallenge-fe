/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
    createEmployee,
    getAllEmployees,
} from '../../../../redux/asyncActions/employees.actions'
import { selectEmployeesState } from '../../../../redux/selectors/employees.selectors'

import { ICreateEmployeeDto } from '../../../../interfaces/employees/employees.interfaces'
import { createEmployeeSchema } from '../../../../schemas/employees.schema'

// components
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { unwrapResult } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

export interface CreateEmployeeProps {
    isOpen: boolean
    onClose: () => void
}

export const CreateEmployee: React.FC<CreateEmployeeProps> = (props) => {
    const { isOpen, onClose } = props

    const dispatch = useAppDispatch()
    const { isCreatingEmployee } = useAppSelector(selectEmployeesState)
    const [createEmployeePayload, setCreateEmployeePayload] =
        useState<ICreateEmployeeDto>({
            firstName: '',
            middleInitial: '',
            lastName: '',
            dateOfBirth: '',
            dateOfEmployment: '',
        })

    const handleSave = async (): Promise<void> => {
        if (
            createEmployeePayload.dateOfBirth === '' ||
            createEmployeePayload.dateOfEmployment === ''
        ) {
            toast.error('Invalid input please try again')
            return
        }

        const dateOfBirth = createEmployeePayload.dateOfBirth as any
        const dateOfEmployment = createEmployeePayload.dateOfEmployment as any

        createEmployeePayload.dateOfBirth = `${dateOfBirth.$y}-${(
            (dateOfBirth.$M as number) + 1
        )
            .toString()
            .padStart(2, '0')}-${dateOfBirth.$D.toString().padStart(2, '0')}`

        createEmployeePayload.dateOfEmployment = `${dateOfEmployment.$y}-${(
            (dateOfEmployment.$M as number) + 1
        )
            .toString()
            .padStart(2, '0')}-${dateOfEmployment.$D
            .toString()
            .padStart(2, '0')}`

        const result = await createEmployeeSchema.safeParseAsync(
            createEmployeePayload
        )

        if (result.success) {
            void dispatch(createEmployee(createEmployeePayload))
                .then(unwrapResult)
                .then(() => {
                    void dispatch(getAllEmployees())

                    onClose()
                })
        } else {
            toast.error('Invalid input. Please try again')
        }
    }

    const handleUpdateEmployeePayload = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setCreateEmployeePayload({
            ...createEmployeePayload,
            [e.target.id]: e.target.value,
        })
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Create Employee</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <TextField
                            disabled={isCreatingEmployee}
                            fullWidth
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            value={createEmployeePayload.firstName}
                            onChange={handleUpdateEmployeePayload}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            disabled={isCreatingEmployee}
                            fullWidth
                            margin="dense"
                            id="middleInitial"
                            label="Initial"
                            type="text"
                            variant="outlined"
                            value={createEmployeePayload.middleInitial}
                            onChange={handleUpdateEmployeePayload}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            disabled={isCreatingEmployee}
                            fullWidth
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            value={createEmployeePayload.lastName}
                            onChange={handleUpdateEmployeePayload}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disabled={isCreatingEmployee}
                                label="Date of Birth"
                                value={
                                    createEmployeePayload.dateOfBirth || null
                                }
                                onChange={(newValue) =>
                                    setCreateEmployeePayload({
                                        ...createEmployeePayload,
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disabled={isCreatingEmployee}
                                label="Date of Employment"
                                value={
                                    createEmployeePayload.dateOfEmployment ||
                                    null
                                }
                                onChange={(newValue: any): void =>
                                    setCreateEmployeePayload({
                                        ...createEmployeePayload,
                                        dateOfEmployment: newValue,
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
                <Button
                    disabled={isCreatingEmployee}
                    onClick={onClose}
                    color="error"
                >
                    Cancel
                </Button>
                <Button disabled={isCreatingEmployee} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
