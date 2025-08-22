import {query} from "./NotionApi";
import config from "../utils/Configuration";

const DB: string = config.PLAYER_DB;

export type PlayerId = string;
export type Player = {
    id: PlayerId,
    name: string
}

export async function getPlayers(): Promise<Array<Player>> {
    type PlayerDTO = {
        id: string;
        properties: {
            Name: {
                title: Array<{ plain_text: string }>;
            };
        };
    };

    const data: Array<PlayerDTO> = await query<PlayerDTO>(DB, undefined);

    return data.map((player: PlayerDTO): Player => ({
        id: player.id,
        name: player.properties.Name.title[0].plain_text
    }));
}

export async function getFirstTeamPlayers(): Promise<Array<Player>> {
    type PlayerDTO = {
        id: string;
        properties: {
            Name: {
                title: Array<{ plain_text: string }>;
            };
        };
    };

    const body: any = {
        "filter": {
            "property": "Primer equipo",
            "checkbox": {
                "equals": true
            }
        }
    }

    const data: Array<PlayerDTO> = await query<PlayerDTO>(DB, body);

    return data.map((player: PlayerDTO): Player => ({
        id: player.id,
        name: player.properties.Name.title[0].plain_text
    }));
}
