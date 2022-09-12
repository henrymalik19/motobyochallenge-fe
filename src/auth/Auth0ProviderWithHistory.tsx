import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

export const Auth0ProviderWithHistory: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN as string
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string

    const navigate = useNavigate()

    const onRedirectCallback = (appState: any): void => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        navigate(appState?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={audience}
        >
            {children}
        </Auth0Provider>
    )
}
