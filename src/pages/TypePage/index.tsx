import { Flex, Text } from '$components'
import { MainLayout } from '$containers'
import { useAppDispatch, useAppSelector } from '$hooks'
import { CreateTypeFormModal } from '$modals/CreateTypeFormModal'
import { modalSlice, useGetItemsQuery, useGetTypesQuery } from '$store'
import { GetTypesColumns } from '$utils'
import { Button, Table } from 'antd'
import React from 'react'

export const TypePage = () => {
   const dispatch = useAppDispatch()
   const columns = GetTypesColumns()

   const modalOpened = useAppSelector(
      (state) => state.materialSlice.modalOpened
   )

   const { data: types, isLoading } = useGetTypesQuery()

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
                  dataSource={types}
                  style={{ flex: '1' }}
               />
            </Flex>
         </Flex>
         <CreateTypeFormModal />
      </MainLayout>
   )
}
