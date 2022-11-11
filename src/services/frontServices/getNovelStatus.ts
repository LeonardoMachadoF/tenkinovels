export type StatusType = "ongoing" | "complete" | "hiatus"

export const getNovelStatus = (status: StatusType) => {
    const statuses = {
        ongoing: 'Em lançamento',
        complete: 'Finalizada',
        hiatus: 'Em hiato'
    }

    return statuses[status]
}