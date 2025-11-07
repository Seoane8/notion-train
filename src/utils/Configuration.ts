import * as dotenv from "dotenv"

dotenv.config()

export default {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_HOST: process.env.NOTION_HOST,
    NOTION_VERSION: "2025-09-03",
    PLAYER_DB: "25672e95-66bc-819c-b108-000b5dc92c2f",
    MATCH_DB: "25672e95-66bc-81a2-91b9-000b4fa89828",
    TRAINING_DB: "25672e95-66bc-8173-9947-000b2fcec72c",
    ATTENDANCE_DB: "25672e95-66bc-8125-8ff2-000b61ab2fec",
    STATS_DB: "25672e95-66bc-816f-a64a-000bd7544999"
}