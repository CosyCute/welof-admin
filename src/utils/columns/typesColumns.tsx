import { LineClamp, Text } from '$components'
import { TypeResponseItem } from '$models'
import {
   commonSlice,
   modalSlice,
   useDeleteTypeMutation,
   useGetTypesQuery,
} from '$store'
import { getFormattedDate } from '$utils/dates'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useDispatch } from 'react-redux'

export const GetTypesColumns = ():
   | ColumnsType<TypeResponseItem>
   | undefined => {
   const dispatch = useDispatch()

   const [deleteType, response] = useDeleteTypeMutation()
   const { refetch } = useGetTypesQuery()
   const handleUpdate = (id: string) => {
      dispatch(modalSlice.actions.changeUpdateModalOpened(true))
      dispatch(modalSlice.actions.changeCurrentId(id))
   }

   const handleDelete = (id: string) => {
      deleteType(id).then(() => {
         refetch()
         dispatch(commonSlice.actions.successDeleteMessage())
      })
   }

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
         key: 'name',
         dataIndex: 'name',
         title: 'Название',
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
   ]
}
