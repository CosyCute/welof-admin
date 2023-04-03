import { Flex, LineClamp, Text } from '$components';
import { API_KEY } from '$constants';
import { ItemResponseItem } from '$models';
import {
    modalSlice,
    useDeleteItemMutation,
    useGetItemsQuery,
    useGetMaterialsQuery,
    useGetTypesQuery,
} from '$store';
import { getFormattedDate } from '$utils/dates';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';

export const GetItemsColumns = ():
    | ColumnsType<ItemResponseItem>
    | undefined => {
    const dispatch = useDispatch();

    const [deleteItem, response] = useDeleteItemMutation();
    const materials = useGetMaterialsQuery().data;
    const types = useGetTypesQuery().data;
    const { refetch } = useGetItemsQuery();
    const handleUpdate = (id: string) => {
        dispatch(modalSlice.actions.changeUpdateModalOpened(true));
        dispatch(modalSlice.actions.changeCurrentId(id));
    };

    const handleDelete = (id: string) => {
        deleteItem(id).then(() => refetch());
    };

    return [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            render: (_, record) => (
                <LineClamp maxWidth={11}>{record.id}</LineClamp>
            ),
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Название',
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Цена',
            render: (_, record) => <Text>{record.price + '₽'}</Text>,
        },
        {
            width: '120px',
            key: 'in_stock',
            dataIndex: 'in_stock',
            title: 'В наличии',
            render: (_, record) => (
                <Flex justify="center">{record.in_stock ? '✓' : '☓'}</Flex>
            ),
        },
        {
            key: 'img',
            dataIndex: 'img',
            title: 'Изображения',
            render: (_, record) =>
                record.img.map((img, index) => (
                    <a
                        rel="noreferrer"
                        key={img}
                        target="_blank"
                        href={`${API_KEY}/${img}`}
                    >
                        Ссылка №{index + 1}
                    </a>
                )),
        },
        {
            key: 'previous_price',
            dataIndex: 'previous_price',
            title: 'Предыдущая цена',
            width: 170,
            render: (_, record) => <Text>{record.previous_price + '₽'}</Text>,
        },
        {
            key: 'size',
            dataIndex: 'size',
            title: 'Размеры',
        },
        {
            key: 'materialsIds',
            dataIndex: 'materialsIds',
            title: 'Материалы',
            render: (_, record) => {
                return record.materialsIds.map((material) => (
                    <Text key={material}>
                        {materials?.find((item) => item.id === material)?.name}
                    </Text>
                ));
            },
        },
        {
            key: 'typesIds',
            dataIndex: 'typesIds',
            title: 'Тип товара',
            render: (_, record) => {
                return record.typesIds.map((type) => (
                    <Text key={type}>
                        {types?.find((item) => item.id === type)?.name}
                    </Text>
                ));
            },
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
                    description="Вы уверены что хотите удалить товар?"
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
