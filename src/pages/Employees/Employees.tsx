import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { IEmployee } from '../../interfaces/employees/employees.interfaces'

// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
    deleteEmployee,
    getAllEmployees,
} from '../../redux/asyncActions/employees.actions'
import { selectEmployeesState } from '../../redux/selectors/employees.selectors'

// components
import { Page } from '../../components/Page'
import { EmployeeDetails } from './components/EmployeeDetails'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// styles
import styles from './Employees.module.scss'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { CreateEmployee } from './components/CreateEmployee'

export const Employees: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoading, isDeletingEmployee, employees, error } =
        useAppSelector(selectEmployeesState)

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<null | string>(
        null
    )
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState<null | string>(
        null
    )
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

    useEffect(() => {
        void dispatch(getAllEmployees())
    }, [])

    useEffect(() => {
        if (error != null) toast.error(error)
    }, [error])

    useEffect(() => {
        if (params.id !== undefined) {
            setSelectedEmployeeId(params.id)
            setIsDetailModalOpen(true)
        }
    }, [params.id])

    const handleCloseDetailModal = (): void => {
        setIsDetailModalOpen(false)
        navigate('/employees')
    }

    const handleOpenCreateModal = (): void => {
        setIsCreateModalOpen(true)
    }

    const handleCloseCreateModal = (): void => {
        setIsCreateModalOpen(false)
    }

    const handleOpenConfirmDialog = (id: string): void => {
        setEmployeeIdToDelete(id)
        setIsConfirmDialogOpen(true)
    }

    const handleCloseConfirmDialog = (): void => {
        setIsConfirmDialogOpen(false)
    }

    const handleConfirmDeleteEmployee = async (): Promise<void> => {
        dispatch(deleteEmployee(employeeIdToDelete as string))
            .then(() =>
                toast.success(
                    `EMployee with id ${
                        employeeIdToDelete as string
                    } was deleted successfully`
                )
            )
            .catch(() =>
                toast.error(
                    `Unable to delete employee with id ${
                        employeeIdToDelete as string
                    } please try again later`
                )
            )
            .finally(() => {
                handleCloseConfirmDialog()
                void dispatch(getAllEmployees())
            })
    }

    const TABLE_COLUMNS: GridColDef[] = [
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'middleInitial',
            headerName: 'Initial',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            type: 'date',
        },
        {
            field: 'dateOfEmployment',
            headerName: 'Date of Employment',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            type: 'date',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            renderCell: (params: GridRenderCellParams<any, IEmployee>) => {
                const handleViewEmployeeDetails = (
                    e: React.MouseEvent<HTMLButtonElement>
                ): void => {
                    e.stopPropagation()

                    navigate(`/employees/${params.row.id}`)
                }

                const handleDeleteEmployee = (
                    e: React.MouseEvent<HTMLButtonElement>
                ): void => {
                    e.stopPropagation()

                    handleOpenConfirmDialog(params.row.id)
                }

                return (
                    <Box>
                        <IconButton
                            size="small"
                            onClick={handleViewEmployeeDetails}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={handleDeleteEmployee}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )
            },
        },
    ]

    return (
        <Page className={styles.container} isLoading={isLoading}>
            <ConfirmDialog
                isDisabled={isDeletingEmployee}
                isOpen={isConfirmDialogOpen}
                title="Confirm Delete Employee"
                content="Are you sure you want to delete this employee?"
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDeleteEmployee}
            />
            <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={handleOpenCreateModal}
            >
                <AddIcon />
            </Fab>
            <Box className={styles.tableContainer}>
                <DataGrid
                    editMode="row"
                    loading={isLoading}
                    columns={TABLE_COLUMNS}
                    rows={employees}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [
                                    {
                                        columnField: 'status',
                                        operatorValue: 'equals',
                                        value: 'ACTIVE',
                                    },
                                ],
                            },
                        },
                    }}
                    disableSelectionOnClick
                />
                {/* {isDetailModalOpen && ( */}
                <EmployeeDetails
                    isOpen={isDetailModalOpen}
                    employeeId={selectedEmployeeId}
                    onClose={handleCloseDetailModal}
                />
                {/* )} */}
                {isCreateModalOpen && (
                    <CreateEmployee isOpen onClose={handleCloseCreateModal} />
                )}
            </Box>
        </Page>
    )
}
