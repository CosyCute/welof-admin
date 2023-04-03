import { Flex, Text } from '$components';
import { useAppDispatch, useAppSelector } from '$hooks';
import { CartItem } from '$models';
import {
    modalSlice,
    useAddOrderMutation,
    useGetItemsQuery,
    useGetOrderQuery,
    useGetOrdersQuery,
    useUpdateOrderMutation,
} from '$store';
import { Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import React, {
    ChangeEvent,
    FC,
    HTMLAttributes,
    useEffect,
    useState,
} from 'react';

import classes from './Modal.module.css';

interface CustomInputProps extends HTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (value: any) => void;
}

const CustomInput: FC<CustomInputProps> = (props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    };

    return <Input {...props} value={props.value} onChange={handleChange} />;
};

export const CreateOrderFormModal = () => {
    const dispatch = useAppDispatch();

    const messageApi = useAppSelector((state) => state.commonSlice.messageApi);
    const createFormModalOpened = useAppSelector(
        (state) => state.modalSlice.createFormModalOpened
    );
    const updateFormModalOpened = useAppSelector(
        (state) => state.modalSlice.updateFormModalOpened
    );
    const currentId = useAppSelector((state) => state.modalSlice.currentId);

    const [name, setName] = useState<string>('');
    const [title, setTitle] = useState('');
    const [opened, setOpened] = useState(false);
    const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

    const handleReset = () => {
        setName('');
    };

    const { data: order, refetch } = useGetOrderQuery(currentId);
    const items = useGetItemsQuery().data;
    const { refetch: refetchOrders } = useGetOrdersQuery();
    const [createOrder] = useAddOrderMutation();
    const [updateOrder] = useUpdateOrderMutation();

    useEffect(() => {
        refetch();
    }, [currentId]);

    useEffect(() => {
        if (updateFormModalOpened) {
            setTitle('Изменение типа');
            setOpened(true);
            if (order && Object.keys(order).length) {
                setName(order.name);
                setSelectedItems(order.items);
            }
        }
        if (createFormModalOpened) {
            setTitle('Создание типа');
            setOpened(true);
        }
    }, [updateFormModalOpened, createFormModalOpened, order]);

    const handleClose = () => {
        dispatch(modalSlice.actions.changeCreateModalOpened(!opened));
        dispatch(modalSlice.actions.changeUpdateModalOpened(!opened));
        dispatch(modalSlice.actions.changeCurrentId(''));
        handleReset();
        setOpened(false);
    };

    const handleSubmit = () => {
        // const data: OrderPayload = {
        //     name,
        // };
        // if (name) {
        //     if (updateFormModalOpened)
        //         updateOrder({
        //             data,
        //             id: order?.id,
        //         }).then(() => {
        //             refetchOrders();
        //             dispatch(commonSlice.actions.successUpdateMessage());
        //         });
        //     else {
        //         createOrder(data).then(() => {
        //             refetchOrders();
        //             dispatch(commonSlice.actions.successCreateMessage());
        //         });
        //     }
        //     handleClose();
        // } else {
        //     messageApi?.open({
        //         type: 'error',
        //         content: 'Не добавлено имя!',
        //     });
        // }
    };

    return (
        <Modal
            className={classes.modal}
            open={opened}
            onCancel={handleClose}
            onOk={handleSubmit}
        >
            {order && (
                <>
                    <Text size="18px">{title}</Text>
                    <Flex
                        mt="20px"
                        className={classes.content}
                        direction="column"
                        gap="20px"
                    >
                        <Flex direction="column" gap="4px">
                            <Text>Название</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Товары</Text>
                            <Select
                                value={selectedItems}
                                onChange={setSelectedItems}
                                mode="multiple"
                            >
                                {items?.map((item) => (
                                    <Select.Option key={item.id} value={item}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Название</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Название</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Название</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Название</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Название</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                    </Flex>
                </>
            )}
        </Modal>
    );
};
