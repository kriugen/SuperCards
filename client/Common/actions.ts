export type Action = { type: 'ERROR', error: any }
    | { type: 'FETCH_START' }
    | { type: 'FETCH_END' }
    | { type: 'FETCH_PROGRESS' }
    | { type: 'ROUTE_CHANGE' }

export const error = (error: any): Action => {
    return {
        type: 'ERROR',
        error
    }
}

export const routeChange = (path: string) => {
    return {
        type: 'ROUTE_CHANGE',
        path,
    }
}