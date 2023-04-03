import { MarginDiv, MarginStyledCSS } from '$models'
import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps extends MarginDiv {
   justify?: string
   direction?: 'column' | 'row'
   align?: string
   gap?: string
}

const StyledFlex = styled.div<IProps>`
   display: flex;
   flex-direction: ${(props) => props.direction || 'row'};
   justify-content: ${(props) => props.justify || ''};
   align-items: ${(props) => props.align || ''};
   gap: ${(props) => props.gap || ''};
   ${MarginStyledCSS}
`
export const Flex: FC<IProps> = (props) => {
   return <StyledFlex {...props} />
}
