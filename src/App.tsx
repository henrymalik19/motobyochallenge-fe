import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

// page components
import { Home } from './pages/Home'
import { Employees } from './pages/Employees'

// components
import { Toaster } from 'react-hot-toast'
import CssBaseline from '@mui/material/CssBaseline'
import { Loading } from './components/Loading'
import { NotFound } from './pages/NotFound'
// import { ProtectedRoute } from './components/ProtectedRoute'

export const App: FC = () => {
    const { isLoading, isAuthenticated } = useAuth0()

    useEffect(() => {
        if (isAuthenticated) {
            const { getAccessTokenSilently } = useAuth0()
            void getAccessTokenSilently().then((token) =>
                localStorage.setItem('token', token)
            )
        }
    }, [isAuthenticated])

    return (
        <>
            <CssBaseline />
            {isLoading && <Loading fullScreen />}
            {!isLoading && (
                <>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/employees/:id" element={<Employees />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                </>
            )}
        </>
    )
}
