export const numberFormatter = (n: number) => {
    return (Number(n) < 10) ? `0${n}` : n
}