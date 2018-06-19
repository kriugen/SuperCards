export interface Error {
    message: string,
    errors?: Array<string>,    
}

export interface CommonState {
    error: Error,
    progress: boolean,
    executing: boolean,
}