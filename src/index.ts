console.log('Hello world!');

import express, {Application} from 'express'; 
import dotenv, {DotenvConfigOutput} from 'dotenv';

const app:Application = express();

const config: DotenvConfigOutput = dotenv.config({ path : __dirname + '/../.env' });

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`);
});






