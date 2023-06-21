import React from 'react'
import { css } from 'styled-components'

export interface MarginProps {
   mt?: string
   ml?: string
   mr?: string
   mb?: string
   width?: string
   height?: string
}

export type MarginHTML<T> = React.HTMLAttributes<T> & MarginProps

export type MarginDiv = React.HTMLAttributes<HTMLDivElement> & MarginProps

export const MarginStyledCSS = css<MarginProps>`
   margin-top: ${(props) => props.mt || ''};
   margin-left: ${(props) => props.ml || ''};
   margin-right: ${(props) => props.mr || ''};
   margin-bottom: ${(props) => props.mb || ''};
`
