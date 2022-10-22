import React from 'react'
import { useQuery } from 'react-query'

import { fetchNews } from '../../services'

const News = () => {
    const { status, data } = useQuery(['getNews'], fetchNews)
    const { results: news = [] } = data ?? {}

    if (status === 'loading') return <h1>Loading...</h1>

    return (
        <div className="w-full divide-y divide-ce-purple-700 bg-ce-purple-500 rounded-lg">
            {news.map((n: any) => (
                <a
                    href={n?.link}
                    className="text-md my-2 p-3 flex flex-col text-left bg-ce-purple-400 text-black rounded-md cursor-pointer"
                    key={n.title}
                    target="blank"
                >
                    <div className="font-title font-semibold text-[16px] mb-2 leading-4">
                        {n?.title}
                    </div>
                    <div className="font-title text-sm">{n.author}</div>
                    <p className="font-text text-sm">
                        {n?.description?.slice(0, 300)}...
                    </p>
                </a>
            ))}
        </div>
    )
}

export default News
