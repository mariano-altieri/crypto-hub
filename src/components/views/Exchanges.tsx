import React, { useMemo, useState } from 'react'
import millify from 'millify'
import { useQuery } from 'react-query'

import { fetchExchanges } from '../../services'

const Exchanges = () => {
    const { status, data } = useQuery(['getExchanges'], fetchExchanges)
    const { data: exchanges = [] } = data ?? {}
    const [search, setSearch] = useState('')

    const formattedExchanges = useMemo(() => {
        let output = exchanges

        if (search) {
            output = output.filter(
                (exchange: any) =>
                    exchange.name
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
            )
        }

        return output
    }, [exchanges, search])

    if (status === 'loading') return <h1>Loading...</h1>

    return (
        <>
            <div className="mt-1">
                <input
                    type="text"
                    name="exchange-query"
                    id="exchange-query"
                    className="block w-full rounded-md border-ce-purple-300 shadow-sm py-2 px-2 outline-none bg-ce-purple-500 focus:bg-ce-purple-300 focus:text-ce-purple-700 focus:placeholder:text-ce-purple-700"
                    placeholder="Search by Exchange Name"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            <table className="w-full divide-y divide-ce-purple-700 bg-ce-purple-500 rounded-lg">
                <thead className="bg-ce-purple-700 text-ce-purple-300 font-title text-left">
                    <tr>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Rank
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Trading Pairs
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Volume (24h)
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Total (%)
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-ce-purple-700 text-md text-left bg-ce-purple-400 text-black rounded-lg">
                    {formattedExchanges.map((exchange: any) => (
                        <tr key={exchange.name}>
                            <td className="whitespace-nowrap px-3 py-2 capitalize w-[20px]">
                                {exchange.rank}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-ellipsis overflow-hidden capitalize">
                                {exchange.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2">
                                ${exchange.tradingPairs}
                            </td>

                            <td className="whitespace-nowrap px-3 py-2">
                                {exchange.volumeUsd ? (
                                    <>
                                        $
                                        {millify(
                                            parseFloat(exchange.volumeUsd)
                                        )}
                                    </>
                                ) : (
                                    '-'
                                )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2">
                                {exchange.percentTotalVolume ? (
                                    <>
                                        $
                                        {parseFloat(
                                            exchange.percentTotalVolume
                                        ).toFixed(2)}{' '}
                                        %
                                    </>
                                ) : (
                                    '-'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Exchanges
