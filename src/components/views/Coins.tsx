import React, { useMemo, useRef, useState } from 'react'
import cx from 'classnames'
import millify from 'millify'
import { useQuery } from 'react-query'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'

import { fetchCoins } from '../../services/coins'
import { useEffect } from 'react'

const isAssetGrowing = (asset: any) => {
    if (!asset?.previousPriceUsd) {
        return null
    }

    return parseFloat(asset.priceUsd) > parseFloat(asset.previousPriceUsd)
}

const Coins = () => {
    const { status, data } = useQuery(['getCoins'], fetchCoins, {
        //refetchInterval: 1000,
    })
    const { data: assets = [] } = data ?? {}
    const oldAssets = useRef<any>([])
    const [search, setSearch] = useState('')

    const formattedAssets = useMemo(() => {
        let output = assets.map((asset: any, index: number) => {
            if (!oldAssets.current[index]) {
                oldAssets.current[index] = { ...asset }
                return asset
            }

            asset.previousPriceUsd = oldAssets.current[index].priceUsd
            return asset
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
    }, [assets, search])

    useEffect(() => {
        const pricesWs = new WebSocket(
            'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin'
        )

        pricesWs.onmessage = function (msg) {
            console.log(msg.data)
        }
    }, [])

    if (status === 'loading') return <h1>Loading...</h1>

    return (
        <>
            <div className="mt-1">
                <input
                    type="text"
                    name="coin-query"
                    id="coin-query"
                    className="block w-full rounded-md border-ce-purple-300 shadow-sm py-2 px-2 outline-none bg-ce-purple-500 focus:bg-ce-purple-300 focus:text-ce-purple-700 focus:placeholder:text-ce-purple-700"
                    placeholder="Search by Name or Symbol"
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
                        <tr
                            key={asset.id}
                            className={cx({
                                flash: isAssetGrowing(asset),
                            })}
                        >
                            <td className="whitespace-nowrap px-3 py-2 capitalize w-[30px]">
                                {asset.rank}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 flex items-center">
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
                                        'whitespace-nowrap px-3 py-2': true,
                                        'asset-growing': isAssetGrowing(asset),
                                        'asset-shrinking':
                                            isAssetGrowing(asset) === false,
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
