import React, { useEffect } from 'react'

import Layout from './components/layouts/Layout'
import Coins from './components/views/Coins'
import News from './components/views/News'
import Exchanges from './components/views/Exchanges'
import { useNavigation } from './components/hooks/useNavigation'
import { MainSections } from './types/enums'

function App() {
    useEffect(() => {
        // const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@trade')
        // const ws = new WebSocket('wss://fstream.binance.com/ws/!ticker@arr')
        // ws.onmessage = (e) => {
        //     if (e?.data) {
        //         const trade = JSON.parse(e.data) // parsing single-trade record
        //         console.log(trade)
        //     }
        // }
        // return () => {
        //     ws.close()
        // }
        // const doFetch = async () => {
        //     const res = await fetch(
        //         'https://fstream.binance.com/api/v3/ticker/24hr'
        //     )
        //     console.log(res)
        // }
        // doFetch()
        // const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')
        // tradeWs.onmessage = function (msg) {
        //     console.log(msg.data)
        // }
        //         {"exchange":"binance","base":"enzyme","quote":"tether","direction":"buy","price":36.59,"volume":0.901,"timestamp":1666422331415,"priceUsd":36.61348314172131}
        // App.tsx:26 {"exchange":"binance",
        // const pricesWs = new WebSocket(
        //     'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin'
        // )
        // pricesWs.onmessage = function (msg) {
        //     console.log(msg.data)
        // }
        // const doFetch = async () => {
        //     const res = await fetch('https://api.coincap.io/v2/assets')
        //     const data = await res.json()
        //     console.log(data)
        // }
        // const intervalId = window.setInterval(doFetch, 1000)
        // return () => clearInterval(intervalId)
        // '0.5387149685923732' // change (24h)
        // 'https://blockchain.info/'
        // 'bitcoin' // id
        // '367721117618.5726024840558410' // market cap
        // '21000000.0000000000000000'
        // 'Bitcoin' // name
        // '19166.0549006134037555' // price
        // '1'
        // '19186062.0000000000000000'
        // 'BTC' // abbrev
        // '10116727155.9789195477851533' // volume 24h
        // '19034.1531431882287912'
    }, [])

    const { activeTab } = useNavigation()

    let component = <Coins />

    if (activeTab === MainSections.NEWS) component = <News />
    else if (activeTab === MainSections.EXCHANGES) component = <Exchanges />

    return <Layout>{component}</Layout>
}

export default App
