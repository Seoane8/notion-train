import * as dotenv from "dotenv"

dotenv.config()

export default {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_HOST: process.env.NOTION_HOST
}