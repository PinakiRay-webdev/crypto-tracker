export const minimizePrice = (price) =>{
    return new Intl.NumberFormat('en' , {
        notation : 'compact',
        maximumFractionDigits: 2
    }).format(price)
}