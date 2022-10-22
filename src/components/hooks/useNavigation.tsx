import React, { createContext, FC, useContext, useState } from 'react'
import { MainSections } from '../../types/enums'

interface NavigationContextProps {
    activeTab: MainSections
    setActiveTab: React.Dispatch<React.SetStateAction<MainSections>>
}

export const NavigationContext = createContext<NavigationContextProps>({
    activeTab: MainSections.COINS,
    setActiveTab: () => {},
})

interface NavigationProviderProps {
    children: React.ReactNode
    collapsed?: boolean
}

export const NavigationProvider: FC<NavigationProviderProps> = ({
    children,
}) => {
    const [activeTab, setActiveTab] = useState(MainSections.COINS)

    return (
        <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </NavigationContext.Provider>
    )
}

export const useNavigation = () => useContext(NavigationContext)
