export const getNovelStatus = (status: "ongoing" | "complete" | "hiatus") => {
    const statuses = {
        ongoing: 'Em lançamento',
        complete: 'Finalizada',
        hiatus: 'Em hiato'
    }

    return statuses[status]
}