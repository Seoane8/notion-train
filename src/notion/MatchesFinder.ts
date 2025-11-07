import {query} from "./NotionApi";
import config from "../utils/Configuration";

const DB: string = config.MATCH_DB;

export type MatchId = string;

export async function getMatches(): Promise<Array<MatchId>> {
    type MatchDTO = {
        id: string;
    };

    const body: any = {
        "filter": {
            "property": "Estadísticas Cargadas",
            "formula": {
                "checkbox": {
                    "equals": false
                }
            }
        }
    }

    const data: Array<MatchDTO> = await query<MatchDTO>(DB, body);

    return data.map((training: MatchDTO): MatchId => training.id);
}
