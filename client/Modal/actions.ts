export type Type = 'SHOW_MODAL' | 'HIDE_MODAL'
export type Action = {
    type: 'SHOW_MODAL',
    modalType: string,
    modalProps: any
} | { type: 'HIDE_MODAL' }

export const showModal = (modalType: string, modalProps:any): Action => {
    return {
        type: 'SHOW_MODAL',
        modalType,
        modalProps,
    }
}

export const hideModal = () => {
    return {
        type: 'HIDE_MODAL',
    }
}