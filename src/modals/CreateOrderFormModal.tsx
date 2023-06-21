import { Flex, OrderItem, Text } from '$components';
import { StatusArray } from '$constants';
import { DeliveryArray } from '$constants/delivery';
import { useAppDispatch, useAppSelector } from '$hooks';
import { CartItem, IEnum, OrderPayload } from '$models';
import {
    commonSlice,
    modalSlice,
    useAddOrderMutation,
    useGetItemsQuery,
    useGetOrderQuery,
    useGetOrdersQuery,
    useUpdateOrderMutation,
} from '$store';
import { Checkbox, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import del from 'del';
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
    type?: string;
}

const CustomInput: FC<CustomInputProps> = (props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    };

    return <Input {...props} value={props.value} onChange={handleChange} />;
};

export const CreateOrderFormModal = () => {
    const dispatch = useAppDispatch();

    const orderItems = useAppSelector((state) => state.orderSlice.orderItems);
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
    const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
    const [address, setAddress] = useState('');
    const [delivery, setDelivery] = useState('');
    const [email, setEmail] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [cost, setCost] = useState(0);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<string | undefined>(undefined);

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
            setTitle('Изменение заказа');
            setOpened(true);
            if (order && Object.keys(order).length) {
                setName(order.name);
                setSelectedItemsIds(order.items?.map((item) => item.id));
                setAddress(order.address);
                setDelivery(order.deliveryId);
                setEmail(order.email);
                setIsPaid(order.is_paid);
                setCost(order.cost);
                setPhone(order.phone);
                setStatus(order.status);
            }
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
        if (status) {
            const data: OrderPayload = {
                cost,
                items: orderItems,
                email,
                name,
                phone,
                address,
                deliveryId: delivery,
                is_paid: isPaid,
                status: status,
            };

            if (name) {
                if (updateFormModalOpened)
                    updateOrder({
                        data,
                        id: order?.id,
                    }).then(() => {
                        refetchOrders();
                        dispatch(commonSlice.actions.successUpdateMessage());
                    });
                else {
                    createOrder(data).then(() => {
                        refetchOrders();
                        dispatch(commonSlice.actions.successCreateMessage());
                    });
                }
                handleClose();
            }
            // else {
            //     messageApi?.open({
            //         type: 'error',
            //         content: 'Не добавлено имя!',
            //     });
            // }
        }
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
                            <Text>Статус</Text>
                            <Select onChange={setStatus} value={status}>
                                {StatusArray.map((item) => (
                                    <Select.Option
                                        value={item.code}
                                        key={item.id}
                                    >
                                        {item.description}
                                    </Select.Option>
                                ))}
                            </Select>{' '}
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Имя</Text>
                            <CustomInput value={name} onChange={setName} />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Товары</Text>
                            <Select
                                value={selectedItemsIds}
                                onChange={setSelectedItemsIds}
                                mode="multiple"
                            >
                                {items?.map((item) => (
                                    <Select.Option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            {selectedItemsIds?.length &&
                                selectedItemsIds.map((selectedItem) => {
                                    return (
                                        <OrderItem
                                            id={selectedItem}
                                            setSelectedItems={
                                                setSelectedItemsIds
                                            }
                                            key={selectedItem}
                                            orderItem={order.items?.find(
                                                (item) =>
                                                    item.id === selectedItem
                                            )}
                                            item={items?.find(
                                                (item) =>
                                                    item.id === selectedItem
                                            )}
                                        />
                                    );
                                })}
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Адрес</Text>
                            <CustomInput
                                value={address}
                                onChange={setAddress}
                            />
                        </Flex>
                        <Flex direction="column">
                            <Text>Доставка</Text>
                            <Select onChange={setDelivery} value={delivery}>
                                {DeliveryArray.map((item) => (
                                    <Select.Option
                                        value={item.id}
                                        key={item.id}
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Email</Text>
                            <CustomInput value={email} onChange={setEmail} />
                        </Flex>
                        <label>
                            <Flex align="center" gap="4px">
                                <Checkbox
                                    checked={isPaid}
                                    onChange={(event) =>
                                        setIsPaid(event.target.checked)
                                    }
                                />
                                <Text>Заказ оплачен</Text>
                            </Flex>
                        </label>
                        <Flex direction="column" gap="4px">
                            <Text>Стоимость заказа</Text>
                            <CustomInput
                                type="number"
                                value={cost?.toString()}
                                onChange={setCost}
                            />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Телефон</Text>
                            <CustomInput value={phone} onChange={setPhone} />
                        </Flex>
                    </Flex>
                </>
            )}
        </Modal>
    );
};
