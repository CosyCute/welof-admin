import { Sidebar } from '$containers/MainLayout/Sidebar'
import { useAppDispatch } from '$hooks'
import { commonSlice } from '$store'
import classes from './MainLayout.module.css'
import { Layout, message, Space } from 'antd'
import React, { FC, useEffect } from 'react'

const { Header, Sider } = Layout

interface IProps {
   children?: any
}

const headerStyle: React.CSSProperties = {
   textAlign: 'center',
   color: '#fff',
   height: 64,
   paddingInline: 50,
   lineHeight: '64px',
   backgroundColor: '#7dbcea',
}

const siderStyle: React.CSSProperties = {
   textAlign: 'center',
   lineHeight: '120px',
   color: '#fff',
   backgroundColor: '#3ba0e9',
}

export const MainLayout: FC<IProps> = ({ children }) => {
   const dispatch = useAppDispatch()

   const [messageApi, contextHolder] = message.useMessage()

   useEffect(() => {
      dispatch(commonSlice.actions.setMessageApi(messageApi))
   }, [])

   return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
         {contextHolder}
         <Layout>
            <Header style={headerStyle}>Header</Header>
            <Layout>
               <Sider className={classes.sidebar} style={siderStyle}>
                  <Sidebar />
               </Sider>
               <div className={classes.contentWrapper}>{children}</div>
            </Layout>
         </Layout>
      </Space>
   )
}
