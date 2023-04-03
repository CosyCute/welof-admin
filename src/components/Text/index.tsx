import { MarginHTML, MarginStyledCSS } from '$models'
import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps extends MarginHTML<HTMLSpanElement> {
   weight?: string
   size?: string
   align?: string
}

const StyledText = styled.span<IProps>`
   font-weight: ${(props) => props.weight || '600'};
   font-size: ${(props) => props.size || ''};
   text-align: ${(props) => props.align || ''};
   ${MarginStyledCSS}
`
export const Text: FC<IProps> = (props) => {
   return <StyledText {...props} />
}
