import { Flex, Text } from '$components';
import { MainLayout } from '$containers';
import { useAppDispatch, useAppSelector } from '$hooks';
import { CreateOrderFormModal } from '$modals/CreateOrderFormModal';
import { modalSlice, useGetOrdersQuery } from '$store';
import { GetOrdersColumns } from '$utils';
import { Button, Table } from 'antd';
import React from 'react';

export const OrderPage = () => {
    const dispatch = useAppDispatch();
    const columns = GetOrdersColumns();

    const modalOpened = useAppSelector(
        (state) => state.materialSlice.modalOpened
    );

    const { data: orders, isLoading } = useGetOrdersQuery();

    const handleClick = () => {
        dispatch(modalSlice.actions.changeCreateModalOpened(!modalOpened));
    };

    return (
        <MainLayout>
            <Flex direction="column">
                <Flex align="center" justify="space-between">
                    <Text size="24px">Заказы</Text>
                    <Button disabled={isLoading} onClick={handleClick}>
                        Добавить
                    </Button>
                </Flex>
                <Flex mt="16px">
                    <Table
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={orders}
                        scroll={{ x: 1600 }}
                        style={{ flex: '1' }}
                    />
                </Flex>
            </Flex>
            <CreateOrderFormModal />
        </MainLayout>
    );
};
