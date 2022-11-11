export type StatuType = "ongoing" | "complete" | "hiatus"

export const getNovelStatus = (status: StatuType) => {
    const statuses = {
        ongoing: 'Em lançamento',
        complete: 'Finalizada',
        hiatus: 'Em hiato'
    }

    return statuses[status]
}