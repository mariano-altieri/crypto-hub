export const fetchExchanges = async () => {
    const res = await fetch('https://api.coincap.io/v2/exchanges')
    const data = await res.json()
    return data
}
