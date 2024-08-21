import {query} from "./NotionApi";
import { NotionUpdate } from "./NotionUpdates";

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

    const data: Array<MatchDTO> = await query<MatchDTO>("736540429d1c42529911e4ea8641c9dd", body);

    return data.map((training: MatchDTO): MatchId => training.id);
}
