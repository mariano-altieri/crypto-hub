export const fetchCoins = async () => {
    const res = await fetch('https://api.coincap.io/v2/assets')
    const data = await res.json()
    return data
}
