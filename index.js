import connectDB from "./config/db.js";
import app from "./app.js"

const PORT = process.env.SERVER_PORT || 7070;

async function startServer() {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`);
        });

        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.error(`PORT ${PORT} already in use.`);
            } else {
                console.error("Failed to start the server: ", error);
            }
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exitCode = 1;
    }
}

startServer();