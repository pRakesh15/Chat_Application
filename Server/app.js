import {server} from './index.js';
import { databasesConnection } from './data/database.js';


const port=process.env.port;
const hostname="127.0.0.1";

databasesConnection();
server.listen(port,()=>
{
    console.log(`server started at http://${hostname}:${port}`)
})