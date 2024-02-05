import React from 'react'
// import { ChatState } from '../../Context/ChartProovider'
import { Avatar, Box, Text } from '@chakra-ui/react'

function UserList({user,functionHendler}) {
  //  console.log(user.user)
  return (
    <div>
    <Box
    onClick={functionHendler}
    className='cursor-pointer bg-gray-400 w-[100%] flex items-center text-black mt-1 px-3 py-2 mb-2 rounded-lg hover:bg-green-700'>
    <Avatar size="sm" className='mr-2 cursor-pointer' name={user.username} src={user.pic}/>
    <Box>
    <Text>{user.username}</Text>
    <Text className='text-xs'><b>Email:</b>{user.email}</Text>
    </Box>
    </Box>
      
    </div>
  )
}

export default UserList
