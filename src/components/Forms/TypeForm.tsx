import { Flex } from '$components'
import { Input } from 'antd'
import React, { useState } from 'react'

export const TypeForm = () => {
   const [name, setName] = useState('')
   const handleChange = (event: any) => {
      // setName()
   }

   return (
      <Flex>
         <Input
            onChange={handleChange}
            title="Name"
            placeholder="Enter name..."
         />
      </Flex>
   )
}
