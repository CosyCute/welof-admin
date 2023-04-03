import { Flex, Text } from '$components'
import { MainLayout } from '$containers'
import { useAppDispatch, useAppSelector } from '$hooks'
import { CreateItemFormModal } from '$modals'
import { modalSlice, useGetItemsQuery } from '$store'
import { GetItemsColumns } from '$utils'
import { Button, Table } from 'antd'
import React from 'react'

export const ItemPage = () => {
   const dispatch = useAppDispatch()
   const columns = GetItemsColumns()

   const modalOpened = useAppSelector(
      (state) => state.materialSlice.modalOpened
   )

   const { data: items, isLoading } = useGetItemsQuery()

   const handleClick = () => {
      dispatch(modalSlice.actions.changeCreateModalOpened(!modalOpened))
   }

   return (
      <MainLayout>
         <Flex direction="column">
            <Flex align="center" justify="space-between">
               <Text size="24px">Товары</Text>
               <Button disabled={isLoading} onClick={handleClick}>
                  Добавить
               </Button>
            </Flex>
            <Flex mt="16px">
               <Table
                  rowKey={(record) => record.id}
                  columns={columns}
                  dataSource={items}
                  scroll={{ x: 1600 }}
               />
            </Flex>
         </Flex>
         <CreateItemFormModal />
      </MainLayout>
   )
}
