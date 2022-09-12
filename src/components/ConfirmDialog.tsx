import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FC, ReactNode } from 'react'

export interface ConfirmDialogProps {
    isDisabled: boolean
    isOpen: boolean
    title: string
    content: ReactNode
    onClose: () => void
    onConfirm: () => void | Promise<void>
}
export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
    const { isDisabled, isOpen, title, content, onClose, onConfirm } = props

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={isDisabled} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isDisabled} onClick={onConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
