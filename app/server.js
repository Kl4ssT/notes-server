import app from './app';
import { PORT } from './config';

app.listen(PORT, (err) => {
    if (err) throw Error(err);

    console.log(`Server is running on port: ${PORT}`)
});