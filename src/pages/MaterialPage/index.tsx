import { Flex, Text } from '$components'
import { MainLayout } from '$containers'
import { useAppDispatch, useAppSelector } from '$hooks'
import { CreateMaterialFormModal } from '$modals'
import { modalSlice, useGetMaterialsQuery } from '$store'
import { GetMaterialsColumns } from '$utils'
import { Button, Table } from 'antd'
import React from 'react'

export const MaterialPage = () => {
   const dispatch = useAppDispatch()
   const columns = GetMaterialsColumns()

   const modalOpened = useAppSelector(
      (state) => state.materialSlice.modalOpened
   )

   const { data: materials, isLoading } = useGetMaterialsQuery()

   const handleClick = () => {
      dispatch(modalSlice.actions.changeCreateModalOpened(!modalOpened))
   }

   return (
      <MainLayout>
         <Flex direction="column">
            <Flex align="center" justify="space-between">
               <Text size="24px">Типы одежды</Text>
               <Button disabled={isLoading} onClick={handleClick}>
                  Добавить
               </Button>
            </Flex>
            <Flex mt="16px">
               <Table
                  rowKey={(record) => record.id}
                  columns={columns}
                  dataSource={materials}
                  style={{ flex: '1' }}
               />
            </Flex>
         </Flex>
         <CreateMaterialFormModal />
      </MainLayout>
   )
}
