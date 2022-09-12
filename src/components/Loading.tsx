import { FC } from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export interface LoadingProps {
    fullScreen?: boolean
}

export const Loading: FC<LoadingProps> = ({ fullScreen = false }) => {
    return (
        <Box
            height={fullScreen ? '100vh' : '100%'}
            width={fullScreen ? '100vw' : '100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    )
}
