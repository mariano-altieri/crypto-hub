import React, { FC } from 'react'
import { SiBlockchaindotcom } from 'react-icons/si'

import MainNavigation from '../navs/MainNavigation'

interface LayoutProps {
    children?: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="text-md text-white font-text bg-ce-purple-500 w-full h-auto flex flex-col justify-start items-center p-3">
            <SiBlockchaindotcom className="text-3xl mb-1 text-ce-yellow" />
            <h1 className="text-xl text-title text-white font-medium">
                <span className="text-ce-orange">Crypto</span>Hub
            </h1>
            <MainNavigation />
            <main className="bg-ce-purple-700 p-3 rounded-lg w-full">
                {children}
            </main>
        </div>
    )
}

export default Layout
