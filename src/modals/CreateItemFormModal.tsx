import { Flex, Text } from '$components';
import { Sizes } from '$constants';
import { useAppDispatch, useAppSelector } from '$hooks';
import { CreateFormItem } from '$models';
import {
    modalSlice,
    useAddItemMutation,
    useGetItemQuery,
    useGetItemsQuery,
    useGetMaterialsQuery,
    useGetTypesQuery,
    useUpdateItemMutation,
} from '$store';
import { Checkbox, Form, Input, Modal, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Option } from 'antd/es/mentions';
import React, {
    ChangeEvent,
    Dispatch,
    FC,
    HTMLAttributes,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

import classes from './Modal.module.css';

interface IProps {
    config?: CreateFormItem[];
}

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

export const CreateItemFormModal: FC<IProps> = () => {
    const dispatch = useAppDispatch();

    const messageApi = useAppSelector((state) => state.commonSlice.messageApi);
    const createFormModalOpened = useAppSelector(
        (state) => state.modalSlice.createFormModalOpened
    );
    const updateFormModalOpened = useAppSelector(
        (state) => state.modalSlice.updateFormModalOpened
    );
    const currentId = useAppSelector((state) => state.modalSlice.currentId);

    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [inStock, setInStock] = useState<boolean>(true);
    const [previousPrice, setPreviousPrice] = useState<string>('');
    const [images, setImages] = useState<FileList | null>();
    const [title, setTitle] = useState('');
    const [opened, setOpened] = useState(false);

    const handleReset = () => {
        setSelectedMaterials([]);
        setSelectedTypes([]);
        setSelectedSizes([]);
        setName('');
        setPrice('');
        setInStock(true);
        setPreviousPrice('');
        setImages(null);
    };

    const { data: item, refetch } = useGetItemQuery(currentId);
    const { refetch: refetchItems } = useGetItemsQuery();
    const materials = useGetMaterialsQuery().data;
    const types = useGetTypesQuery().data;
    const [createItem] = useAddItemMutation();
    const [updateItem] = useUpdateItemMutation();

    useEffect(() => {
        refetch();
    }, [currentId]);

    useEffect(() => {
        if (updateFormModalOpened) {
            setTitle('Изменение товара');
            setOpened(true);
            if (item && Object.keys(item).length) {
                setName(item.name);
                setPrice(item.price?.toString());
                setInStock(item.in_stock);
                setPreviousPrice(item.previous_price?.toString());
                setSelectedSizes(item.size);
                setSelectedTypes(item.typesIds);
                setSelectedMaterials(item.materialsIds);
            }
        }
        if (createFormModalOpened) {
            setTitle('Создание товара');
            setOpened(true);
        }
    }, [updateFormModalOpened, createFormModalOpened, item]);

    const handleClose = () => {
        dispatch(modalSlice.actions.changeCreateModalOpened(!opened));
        dispatch(modalSlice.actions.changeUpdateModalOpened(!opened));
        dispatch(modalSlice.actions.changeCurrentId(''));
        handleReset();
        setOpened(false);
    };

    const handleSubmit = () => {
        const data = new FormData();
        data.append(
            'data',
            JSON.stringify({
                name,
                price,
                in_stock: inStock,
                previous_price: previousPrice,
                size: selectedSizes,
                materialsIds: selectedMaterials,
                typesIds: selectedTypes,
            })
        );
        if (images) {
            for (let i = 0; i < images?.length; i++) {
                data.append('img', images[i]);
            }
            (updateFormModalOpened
                ? updateItem({
                      data,
                      id: item?.id,
                  })
                : createItem(data)
            ).then(() => {
                refetchItems();
            });
            handleClose();
        } else {
            if (updateFormModalOpened) {
                updateItem({
                    data,
                    id: item?.id,
                }).then(() => {
                    refetchItems();
                });
                handleClose();
            } else {
                messageApi?.open({
                    type: 'error',
                    content: 'Не добавлены изображения!',
                });
            }
        }
    };

    const handleSelect = (
        item: string,
        selectedItems: string[],
        setSelectedItems: Dispatch<SetStateAction<string[]>>
    ) => {
        if (selectedItems.includes(item)) {
            setSelectedItems((prev) => prev.filter((temp) => temp !== item));
        } else {
            setSelectedItems((prev) => [...prev, item]);
        }
    };

    const handleChangeInStock = (event: CheckboxChangeEvent) => {
        setInStock(event.target.checked);
    };

    const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
        setImages(event.target.files);
    };

    return (
        <Modal
            className={classes.modal}
            open={opened}
            onCancel={handleClose}
            onOk={handleSubmit}
        >
            {item && (
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
                            <Text>Цена</Text>
                            <CustomInput value={price} onChange={setPrice} />
                        </Flex>
                        <label>
                            <Flex align="center" gap="4px">
                                <Checkbox
                                    checked={inStock}
                                    onChange={handleChangeInStock}
                                />
                                <Text>В наличии?</Text>
                            </Flex>
                        </label>
                        <Flex direction="column" gap="4px">
                            <Text>Предыдущая цена</Text>
                            <CustomInput
                                value={previousPrice}
                                onChange={setPreviousPrice}
                            />
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Размер</Text>
                            <Select
                                value={selectedSizes}
                                onChange={setSelectedSizes}
                                mode="multiple"
                            >
                                {Sizes?.map((size) => (
                                    <Option key={size.name} value={size.name}>
                                        {size.name}
                                    </Option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Материалы</Text>
                            <Select
                                value={selectedMaterials}
                                onChange={setSelectedMaterials}
                                mode="multiple"
                            >
                                {materials?.map((material) => (
                                    <Option
                                        key={material.id}
                                        value={material.id}
                                    >
                                        {material.name}
                                    </Option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Типы</Text>
                            <Select
                                value={selectedTypes}
                                onChange={setSelectedTypes}
                                mode="multiple"
                            >
                                {types?.map((type) => (
                                    <Option key={type.id} value={type.id}>
                                        {type.name}
                                    </Option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column" gap="4px">
                            <Text>Изображения</Text>
                            <Input
                                type="file"
                                multiple
                                onChange={handleChangeImages}
                            />
                        </Flex>
                    </Flex>
                </>
            )}
        </Modal>
    );
};
