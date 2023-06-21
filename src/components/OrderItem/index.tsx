import { Flex } from '$components';
import { API_KEY, Sizes } from '$constants';
import { CartItem, ItemResponseItem } from '$models';
import {Button, Image, Input, Select} from 'antd';
import { Option } from 'antd/es/mentions';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {DeleteOutlined} from "@ant-design/icons";
import {useAppDispatch} from "$hooks";
import {orderSlice} from "$store";

interface IProps {
    id: string;
    item: ItemResponseItem | undefined;
    orderItem: CartItem | undefined;
    setSelectedItems:  React.Dispatch<React.SetStateAction<string[]>>
}

export const OrderItem: FC<IProps> = ({id,  item, orderItem, setSelectedItems }) => {
    const dispatch = useAppDispatch();

    const { img } = item as ItemResponseItem;

    const [localQuantity, setLocalQuantity] = useState(
        orderItem?.quantity.toString()
    );
    const [selectedSizes, setSelectedSizes] = useState<string[] | undefined>(
        orderItem?.size
    );

    useEffect(() => {
        console.log({
            id,
            quantity: localQuantity,
            size: selectedSizes
        })
        if (localQuantity && selectedSizes) {
            dispatch(orderSlice.actions.addItem({
                id,
                quantity: parseInt(localQuantity),
                size: selectedSizes
            }))
        }
    }, [localQuantity, selectedSizes])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalQuantity(event.target.value);
    };

    const handleDelete = () => {
        setSelectedItems(prev => prev.filter(id => id !== item?.id))
        dispatch(orderSlice.actions.removeItem(id))
    }

    return (
        <Flex align="center" justify="space-between">
            <div>
                <Image height={100} width={100} src={`${API_KEY}/${img[0]}`} />
            </div>
            <Input
                style={{ height: 40, width: 100 }}
                type="number"
                onChange={handleChange}
                value={localQuantity}
            />
            <Select
                style={{ width: 210 }}
                value={selectedSizes}
                onChange={setSelectedSizes}
                mode="multiple"
            >
                {Sizes?.map((size) => (
                    <Select.Option key={size.name} value={size.name}>
                        {size.name}
                    </Select.Option>
                ))}
            </Select>
            <Button onClick={handleDelete}><DeleteOutlined /></Button>
        </Flex>
    );
};
