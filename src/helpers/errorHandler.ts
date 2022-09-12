export const errorHandler = (error: any): string => {
    if (error.message === 'Network Error')
        return 'Unable to fetch employees, please try again later'
    return 'Error'
}
