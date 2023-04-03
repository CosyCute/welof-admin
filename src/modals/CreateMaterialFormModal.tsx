import { Flex, Text } from '$components'
import { useAppDispatch, useAppSelector } from '$hooks'
import {
   commonSlice,
   modalSlice,
   useAddMaterialMutation,
   useGetMaterialQuery,
   useGetMaterialsQuery,
   useUpdateMaterialMutation,
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

export const CreateMaterialFormModal = () => {
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

   const { data: material, refetch } = useGetMaterialQuery(currentId)
   const { refetch: refetchMaterials } = useGetMaterialsQuery()
   const [createMaterial] = useAddMaterialMutation()
   const [updateMaterial] = useUpdateMaterialMutation()

   useEffect(() => {
      refetch()
   }, [currentId])

   useEffect(() => {
      if (updateFormModalOpened) {
         setTitle('Изменение типа')
         setOpened(true)
         if (material && Object.keys(material).length) {
            setName(material.name)
         }
      }
      if (createFormModalOpened) {
         setTitle('Создание типа')
         setOpened(true)
      }
   }, [updateFormModalOpened, createFormModalOpened, material])

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
            updateMaterial({
               data,
               id: material?.id,
            }).then(() => {
               refetchMaterials()
               dispatch(commonSlice.actions.successUpdateMessage())
            })
         else {
            createMaterial(data).then(() => {
               refetchMaterials()
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
         {material && (
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
