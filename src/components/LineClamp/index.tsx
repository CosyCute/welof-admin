import { Popover } from 'antd'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

interface IProps {
   maxWidth: number
   children: string
}

const StyledLineClamp = styled.span<IProps>``

export const LineClamp: FC<IProps> = ({ maxWidth, children }) => {
   const [isHover, setIsHover] = useState(false)

   return (
      <Popover content={children} open={isHover}>
         <StyledLineClamp
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            children={children.slice(0, maxWidth) + '...'}
            maxWidth={maxWidth}
         />
      </Popover>
   )
}
