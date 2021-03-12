import express from 'express';
import routes from './routes';


const app = express();

app.use(express.json())

app.use(routes)

app.listen(21478, () => {
    console.log('Server Started on port 21478!');
});