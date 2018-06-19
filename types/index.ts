export interface Id {
    id: number,
}

export interface Size {
    width: number,
    height: number,
}

export type CallbackDone = (success: boolean) => void