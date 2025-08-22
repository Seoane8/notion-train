import {query} from "./NotionApi";
import { NotionUpdate } from "./NotionUpdates";
import config from "../utils/Configuration";

const DB: string = config.MATCH_DB;

export type MatchId = string;

export async function getMatches(update: NotionUpdate): Promise<Array<MatchId>> {
    type MatchDTO = {
        id: string;
    };

    const body: any = {
        "filter": {
            "and": [
                {
                    "timestamp": "created_time",
                    "created_time": {
                        "after": update.from
                    }
                },
                {
                    "timestamp": "created_time",
                    "created_time": {
                        "on_or_before": update.to
                    }
                }

            ]
        }
    }

    const data: Array<MatchDTO> = await query<MatchDTO>(DB, body);

    return data.map((training: MatchDTO): MatchId => training.id);
}
