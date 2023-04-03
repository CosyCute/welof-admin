import { Flex, Text } from '$components'
import { SIDEBAR_CONFIG } from '$constants'
import classes from './MainLayout.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
   return (
      <>
         <Flex direction="column" gap="20px">
            {SIDEBAR_CONFIG.map((item) => (
               <Link className={classes.link} to={item.link} key={item.id}>
                  <Text>{item.name}</Text>
               </Link>
            ))}
         </Flex>
      </>
   )
}
