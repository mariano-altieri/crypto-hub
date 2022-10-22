import React, { FC } from 'react'
import cx from 'classnames'
import { useNavigation } from '../hooks/useNavigation'
import { MainSections } from '../../types/enums'

interface TabProps {
    label: string
}

const Tab: FC<TabProps> = ({ label }) => {
    const { activeTab, setActiveTab } = useNavigation()

    const baseClass = cx({
        'font-title capitalize py-2 px-5': true,
        'bg-ce-purple-700 text-ce-orange': activeTab !== label,
        'bg-ce-yellow text-ce-purple-500': activeTab === label,
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setActiveTab(label as MainSections)
    }

    return (
        <button type="button" className={baseClass} onClick={handleClick}>
            {label}
        </button>
    )
}

export const MainNavigation: FC = () => {
    return (
        <nav className="isolate flex divide-ce-purple-500 rounded-lg overflow-hidden shadow my-5">
            <Tab label="coins" />
            <Tab label="exchanges" />
            <Tab label="news" />
        </nav>
    )
}

export default MainNavigation
