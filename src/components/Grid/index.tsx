import { MarginDiv, MarginStyledCSS } from '$models'
import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps extends MarginDiv {
   colSizes?: string
   rowSizes?: string
}

const StyledGrid = styled.div<IProps>`
   display: grid;
   ${MarginStyledCSS}
`
export const Grid: FC<IProps> = (props) => {
   return <StyledGrid {...props} />
}
