import * as System from './system'
type StringBoolean = 'true' | 'false' | 'undefined'

interface AuthSession extends System.Session {
    user_id: number,
}

interface SearchParams {
    word: string,
}

interface FilterParams {
    filter: 'learned' | 'undefined',
}

interface CardIdParams {
    id: string,
}

interface CardLearnedParams {
    learned: StringBoolean,
}

interface DownloadParams {
    fileName: string,
}

interface TakeParams {
    take: StringBoolean,
}

type Params = SearchParams 
& FilterParams 
& CardIdParams 
& CardLearnedParams
& DownloadParams
& TakeParams

export interface Request extends System.Request<AuthSession> {
    params: Params,
}

export interface Response extends System.Response {}