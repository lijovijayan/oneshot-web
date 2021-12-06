import { Tabs } from 'antd'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { FaUserGraduate } from 'react-icons/fa'
import { GiOrganigram } from 'react-icons/gi'
import '../../styles/screen.styles/dashboard.scss'
import { Overview } from './overview'
const { TabPane } = Tabs

export function Dashboard() {
    function onTabChange(activeKey: string) {
        console.log(activeKey)
    }
    return (
        <div className="dashboard">
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
                <TabPane
                    tab={
                        <div className="tab-title">
                            <IoAnalyticsOutline />
                            Overview
                        </div>
                    }
                    key="1"
                >
                    <Overview />
                </TabPane>
                <TabPane
                    tab={
                        <div className="tab-title">
                            <GiOrganigram />
                            Colleges
                        </div>
                    }
                    key="2"
                >
                    Content of Tab Pane 2
                </TabPane>
                <TabPane
                    tab={
                        <div className="tab-title">
                            <FaUserGraduate />
                            Students
                        </div>
                    }
                    key="3"
                >
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}
