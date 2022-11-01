import useViewport from "@/hooks/useViewport";
import { AppBar, Box, styled, Tab, Tabs } from "@mui/material";
import { ScriptProps } from "next/script";
import { useState } from "react";

interface TabLayoutProps {
    children?: React.ReactNode,
    value: number,
    tabLabel: string[],
    onChange(tabValue:number): void
}

const WhiteBox = styled(Box, {})`
    background-color: white;
    top:0;
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 9;
`

const StyledTab = styled(Tab, {})`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        padding: 10px 16px;
        justify-content: flex-end;
        /* identical to box height, or 21px */

        text-align: center;
        letter-spacing: -0.003em;
        color: #999999;

        &.Mui-selected: {
            color: #ffffff;
        }
        `

const TabLayout = ({ children, value, tabLabel, onChange }: TabLayoutProps) => {

    const styledTabs = tabLabel.map((value:string, index: number) => {
        return (<StyledTab
            key = {'tab-' + index}
            label = {value}
            tabIndex = {index}
        />)
    })

    const viewport = useViewport()

    return (
        <>
            <WhiteBox/>
            <AppBar sx={{
                bgcolor: "#FFFFFF",
                boxShadow: "0",
                borderBottom: 2,
                borderBottomColor: "#DDDDDD",
                height: '48px'
            }} position="fixed" className={viewport=='mobile'? "mt-14 z-10" : "mt-16 z-10" }>
                <Tabs
                    value={value}
                    onChange={(event: React.SyntheticEvent, tabValue: number) => { onChange(tabValue) }}
                    variant="fullWidth"
                    className="static w-full"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    {styledTabs}
                </Tabs>
            </AppBar>
            <div className="mt-12 w-full">
                {children}
            </div>
        </>
    )
}

export default TabLayout