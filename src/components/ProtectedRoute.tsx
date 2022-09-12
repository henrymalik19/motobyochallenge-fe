import { withAuthenticationRequired } from '@auth0/auth0-react'
import { ComponentType, FC } from 'react'
import { Loading } from './Loading'

interface ProtectedRouteProps {
    component: ComponentType
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
    })

    return <Component />
}
