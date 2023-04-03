import { Flex } from '$components'
import { MainLayout } from '$containers'
import { useAppDispatch, useAppSelector } from '$hooks'
import { materialSlice } from '$store/slices'
import { Button } from 'antd'
import React from 'react'

export const MainPage = () => {
   return <MainLayout></MainLayout>
}
