import { Flex, Text } from '$components'
import { useAppDispatch, useAppSelector } from '$hooks'
import {
   commonSlice,
   modalSlice,
   useAddTypeMutation,
   useGetTypeQuery,
   useGetTypesQuery,
   useUpdateTypeMutation,
} from '$store'
import classes from './Modal.module.css'
import { Form, Input, Modal } from 'antd'
import React, {
   ChangeEvent,
   FC,
   HTMLAttributes,
   useEffect,
   useState,
} from 'react'

interface CustomInputProps extends HTMLAttributes<HTMLInputElement> {
   value: string
   onChange: (value: any) => void
}

const CustomInput: FC<CustomInputProps> = (props) => {
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      props.onChange(event.target.value)
   }

   return <Input {...props} value={props.value} onChange={handleChange} />
}

export const CreateTypeFormModal = () => {
   const dispatch = useAppDispatch()

   const messageApi = useAppSelector((state) => state.commonSlice.messageApi)
   const createFormModalOpened = useAppSelector(
      (state) => state.modalSlice.createFormModalOpened
   )
   const updateFormModalOpened = useAppSelector(
      (state) => state.modalSlice.updateFormModalOpened
   )
   const currentId = useAppSelector((state) => state.modalSlice.currentId)

   const [name, setName] = useState<string>('')
   const [title, setTitle] = useState('')
   const [opened, setOpened] = useState(false)

   const handleReset = () => {
      setName('')
   }

   const { data: type, refetch } = useGetTypeQuery(currentId)
   const { refetch: refetchTypes } = useGetTypesQuery()
   const [createType] = useAddTypeMutation()
   const [updateType] = useUpdateTypeMutation()

   useEffect(() => {
      refetch()
   }, [currentId])

   useEffect(() => {
      if (updateFormModalOpened) {
         setTitle('Изменение типа')
         setOpened(true)
         if (type && Object.keys(type).length) {
            setName(type.name)
         }
      }
      if (createFormModalOpened) {
         setTitle('Создание типа')
         setOpened(true)
      }
   }, [updateFormModalOpened, createFormModalOpened, type])

   const handleClose = () => {
      dispatch(modalSlice.actions.changeCreateModalOpened(!opened))
      dispatch(modalSlice.actions.changeUpdateModalOpened(!opened))
      dispatch(modalSlice.actions.changeCurrentId(''))
      handleReset()
      setOpened(false)
   }

   const handleSubmit = () => {
      const data = {
         name,
      }
      if (name) {
         if (updateFormModalOpened)
            updateType({
               data,
               id: type?.id,
            }).then(() => {
               refetchTypes()
               dispatch(commonSlice.actions.successUpdateMessage())
            })
         else {
            createType(data).then(() => {
               refetchTypes()
               dispatch(commonSlice.actions.successCreateMessage())
            })
         }
         handleClose()
      } else {
         messageApi?.open({
            type: 'error',
            content: 'Не добавлено имя!',
         })
      }
   }

   return (
      <Modal
         className={classes.modal}
         open={opened}
         onCancel={handleClose}
         onOk={handleSubmit}
      >
         {type && (
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
               </Flex>
            </>
         )}
      </Modal>
   )
}
