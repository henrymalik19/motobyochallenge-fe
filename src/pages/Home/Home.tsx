import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Page } from '../../components/Page'

import styles from './Home.module.scss'

export const Home: React.FC = () => {
    const navigate = useNavigate()
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        <Page showSidebar={false} className={styles.container}>
            <Box className={styles.header}>
                <Button
                    onClick={() =>
                        isAuthenticated
                            ? navigate('/employees')
                            : loginWithRedirect()
                    }
                >
                    {isAuthenticated ? 'Go To App' : 'Login'}
                </Button>
            </Box>
            <Box className={styles.content}>
                <Typography variant="h1">Employee Viewer</Typography>
            </Box>
        </Page>
    )
}
