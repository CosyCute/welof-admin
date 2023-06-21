import { Flex, LineClamp, Text } from '$components';
import { StatusArray } from '$constants';
import { DeliveryArray } from '$constants/delivery';
import { OrderResponseItem } from '$models';
import {
    commonSlice,
    modalSlice,
    useDeleteOrderMutation,
    useGetOrdersQuery,
} from '$store';
import { getFormattedDate } from '$utils/dates';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';

export const GetOrdersColumns = ():
    | ColumnsType<OrderResponseItem>
    | undefined => {
    const dispatch = useDispatch();

    const [deleteOrder, response] = useDeleteOrderMutation();
    const { refetch } = useGetOrdersQuery();
    const handleUpdate = (id: string) => {
        dispatch(modalSlice.actions.changeUpdateModalOpened(true));
        dispatch(modalSlice.actions.changeCurrentId(id));
    };

    const handleDelete = (id: string) => {
        deleteOrder(id).then(() => {
            refetch();
            dispatch(commonSlice.actions.successDeleteMessage());
        });
    };

    return [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            render: (_, record) => (
                <LineClamp maxWidth={15}>{record.id}</LineClamp>
            ),
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Статус',
            width: 150,
            render: (_, record) => (
                <Flex justify="center">
                    <Text
                        style={{
                            borderRadius: 4,
                            padding: '4px 12px',
                            border: '1px solid black',
                        }}
                    >
                        {
                            StatusArray.find(
                                (status) => status.code === record.status
                            )?.description
                        }
                    </Text>
                </Flex>
            ),
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Имя клиента',
            width: 150,
        },
        {
            key: 'items',
            dataIndex: 'items',
            title: 'Товары',
            render: (_, record) => {
                return (
                    <Flex direction="column">
                        {record.items.map((item) => (
                            <a key={item.id}>
                                <LineClamp maxWidth={7}>{item.id}</LineClamp>
                            </a>
                        ))}
                    </Flex>
                );
            },
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Адрес клиента',
        },
        {
            key: 'deliveryId',
            dataIndex: 'deliveryId',
            title: 'Вид доставки',
            render: (_, record) => {
                return DeliveryArray.find(
                    (item) => record.deliveryId === item.id
                )?.name;
            },
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
        },
        {
            key: 'is_paid',
            dataIndex: 'is_paid',
            title: 'Заказ оплачен',
            render: (_, record) => {
                return record.is_paid ? '✓' : '☓';
            },
        },
        {
            key: 'cost',
            dataIndex: 'cost',
            title: 'Стоимость заказа',
            render: (_, record) => {
                return record.cost + '₽';
            },
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Телефон',
            width: 150,
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Дата создания',
            render: (_, record) => (
                <Text>{getFormattedDate(record.createdAt)}</Text>
            ),
        },

        {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: 'Дата последнего изменения',
            render: (_, record) => (
                <Text>{getFormattedDate(record.updatedAt)}</Text>
            ),
        },
        {
            title: '',
            key: 'update',
            fixed: 'right',
            width: 50,
            render: (_, record) => (
                <a onClick={() => handleUpdate(record.id)}>
                    <EditOutlined />
                </a>
            ),
        },
        {
            title: '',
            key: 'delete',
            fixed: 'right',
            width: 50,
            render: (_, record) => (
                <Popconfirm
                    title="Удаление товара"
                    description="Вы уверены что хотите удалить тип?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Да"
                    cancelText="Нет"
                >
                    <a>
                        <DeleteOutlined />
                    </a>
                </Popconfirm>
            ),
        },
    ];
};
