
import { app } from "./src/app";

const PORT = process.env.SERVER_PORT || 5001;

app.listen(PORT, () => {
    console.log(`port ${PORT} is running`);
});

