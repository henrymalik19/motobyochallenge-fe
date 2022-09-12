import { FC } from 'react'

import Typography from '@mui/material/Typography'
import { Page } from '../components/Page'

import styles from './NotFound.module.scss'

export const NotFound: FC = () => {
    return (
        <Page showSidebar={false} className={styles.container}>
            <Typography variant="h1">404 - NOT FOUND</Typography>
        </Page>
    )
}
