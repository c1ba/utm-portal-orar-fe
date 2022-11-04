export const DataInRomana = (date: Date) => {
    const luni = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    return `${date.getDate()} ${luni[date.getMonth()]} ${date.getFullYear()}`
}