import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChartProovider'
import SideDrower from './pages/SideDrower';
import { Box } from '@chakra-ui/react';
import MyCharts from './pages/MyCharts';
import ChartBox from './pages/ChartBox';
function Chart() {
const {user} = ChatState();
const[fetchAgain,setFetchAgain]=useState(false);
    
  return (
    <div className='w-[100%]'>
     {user && <SideDrower/>}
     <Box className='flex  justify-between w-[100%] h-[91.5vh] p-[10px]'>
     {user && <MyCharts  fetchAgain={fetchAgain}/>}
     {user && <ChartBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
     </Box>
    </div>
  )
}

export default Chart
