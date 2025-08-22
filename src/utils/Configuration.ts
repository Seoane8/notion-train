import * as dotenv from "dotenv"

dotenv.config()

export default {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_HOST: process.env.NOTION_HOST,
    PLAYER_DB: "25672e9566bc81c1ac2ed10ddfad674e",
    MATCH_DB: "25672e9566bc81f6918afacbe4db02c0",
    TRAINING_DB: "25672e9566bc81f7824fc427ce242983",
    ATTENDANCE_DB: "25672e9566bc81a8b597e4274f40477e",
    STATS_DB: "25672e9566bc816aa20cfa2f1f8c1509",
    UPDATES_DB: "25672e9566bc81e1a10dc8701f018beb"
}