import {query} from "./NotionApi";
import { NotionUpdate } from "./NotionUpdates";

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

    const data: Array<PlayerDTO> = await query<PlayerDTO>("1c214cc49e2f4ec9ba47d54a51f3c546", undefined);

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

    const data: Array<PlayerDTO> = await query<PlayerDTO>("1c214cc49e2f4ec9ba47d54a51f3c546", body);

    return data.map((player: PlayerDTO): Player => ({
        id: player.id,
        name: player.properties.Name.title[0].plain_text
    }));
}
