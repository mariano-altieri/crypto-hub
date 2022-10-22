import React, { useMemo, useState, useEffect } from 'react'
import cx from 'classnames'
import millify from 'millify'
import { useQuery } from 'react-query'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'

import { fetchCoins } from '../../services'

const Coins = () => {
    const { status, data } = useQuery(['getCoins'], fetchCoins)
    const { data: assets = [] } = data ?? {}
    const [socketAssets, setSocketAssets] = useState<any>([])
    const [search, setSearch] = useState('')

    const formattedAssets = useMemo(() => {
        let output = assets.map((asset: any, index: number) => {
            const newAsset = { ...asset }
            Object.keys(socketAssets).forEach((key: string) => {
                if (key === newAsset.id) {
                    const oldValue = parseFloat(newAsset.priceUsd).toFixed(3)
                    const newValue = parseFloat(socketAssets[key]).toFixed(3)

                    newAsset.isGrowing = newValue > oldValue
                    newAsset.isShrinking = newValue < oldValue
                    newAsset.priceUsd = newValue
                }
            })

            return newAsset
        })

        if (search) {
            output = output.filter(
                (asset: any) =>
                    asset.name.toLowerCase().indexOf(search.toLowerCase()) !==
                        -1 ||
                    asset.symbol.toLowerCase().indexOf(search.toLowerCase()) !==
                        -1
            )
        }

        return output
    }, [assets, search, socketAssets])

    useEffect(() => {
        const ids = assets.map((asset: any) => asset.id).join(',')
        const pricesWs = new WebSocket(
            `wss://ws.coincap.io/prices?assets=${ids}`
        )

        pricesWs.onmessage = (e: MessageEvent) => {
            setSocketAssets(JSON.parse(e.data))
        }

        return () => pricesWs.close()
    }, [assets])

    if (status === 'loading') return <h1>Loading...</h1>

    return (
        <>
            <div className="mt-1">
                <input
                    type="text"
                    name="coin-query"
                    id="coin-query"
                    className="block w-full rounded-md border-ce-purple-300 shadow-sm py-2 px-2 outline-none bg-ce-purple-500 focus:bg-ce-purple-300 focus:text-ce-purple-700 focus:placeholder:text-ce-purple-700"
                    placeholder="Search by Coin Name or Symbol"
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
                            Price
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Market Cap
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Volume (24h)
                        </th>
                        <th scope="col" className="px-3 py-2 font-medium">
                            Change (24h)
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-ce-purple-700 text-md text-left bg-ce-purple-400 text-black rounded-lg">
                    {formattedAssets.map((asset: any) => (
                        <tr key={asset.id}>
                            <td className="whitespace-nowrap px-3 py-2 capitalize w-[20px]">
                                {asset.rank}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 flex items-center text-ellipsis overflow-hidden">
                                <img
                                    className="inline-block h-10 w-10 rounded-full mr-2"
                                    src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                                    alt=""
                                />
                                <div>
                                    {asset.name}
                                    <div className="text-sm text-ce-purple-700">
                                        {asset.symbol}
                                    </div>
                                </div>
                            </td>
                            <>
                                <td
                                    className={cx({
                                        'whitespace-nowrap px-3 py-2 w-[150px]':
                                            true,
                                        'asset-shrinking': asset.isShrinking,
                                        'asset-growing': asset.isGrowing,
                                    })}
                                >
                                    <div className="flex items-center">
                                        <GoArrowDown className="arrow-down text-lg text-ce-red mr-1" />
                                        <GoArrowUp className="arrow-up text-lg text-ce-green mr-1" />
                                        ${parseFloat(asset.priceUsd).toFixed(2)}
                                    </div>
                                </td>
                            </>
                            <td className="whitespace-nowrap px-3 py-2">
                                ${millify(asset.marketCapUsd)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2">
                                ${millify(asset.volumeUsd24Hr)}
                            </td>
                            <td
                                className={`whitespace-nowrap px-3 py-2 ${
                                    parseFloat(asset.changePercent24Hr) > 0
                                        ? 'text-ce-green'
                                        : 'text-ce-red'
                                }`}
                            >
                                {parseFloat(asset.changePercent24Hr).toFixed(2)}
                                %
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Coins
