import { Input, Stack } from '@chakra-ui/react'
import React from 'react'
import { ArrowRightIcon } from '@chakra-ui/icons'


export default function TextEditor() {
    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "20px" }}>

            <Input variant='filled' placeholder='Send Message' onSubmit={() => {
                console.log('first')
            }} />
            &nbsp;
            <ArrowRightIcon margin={3} cursor={'pointer'} onClick={() => {
                console.log('hi');
            }} />

        </div>

    )
}
