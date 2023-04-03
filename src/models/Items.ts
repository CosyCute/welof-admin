export type ItemsResponse = ItemResponseItem[]

export interface ItemResponseItem {
   id: string
   name: string
   price: number
   in_stock: boolean
   img: string[]
   previous_price: number
   size: string[]
   createdAt: string
   updatedAt: string
   materialsIds: string[]
   typesIds: string[]
}
