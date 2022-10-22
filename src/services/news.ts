export const fetchNews = async () => {
    const res = await fetch(
        'https://newsdata.io/api/1/news?apikey=pub_126055db4db96197a27b0d9ff2092892e6c1e&q=crypto&language=en'
    )
    const data = await res.json()
    return data
}
