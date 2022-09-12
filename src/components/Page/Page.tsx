import { FC, ReactNode } from 'react'

// components
import { Loading } from '../Loading'
import Box from '@mui/material/Box'

// style
import styles from './Page.module.scss'
import { Sidebar } from '../Sidebar'

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean
    showSidebar?: boolean
    children: ReactNode | ReactNode[]
}

export const Page: FC<PageProps> = (props) => {
    const { isLoading = false, showSidebar = true, className, children } = props

    return (
        <Box className={styles.container}>
            {isLoading && <Loading fullScreen />}
            {!isLoading && (
                <Box className={styles.contentContainer}>
                    {showSidebar && <Sidebar />}
                    <Box className={className}>{children}</Box>
                </Box>
            )}
        </Box>
    )
}

export default Page
