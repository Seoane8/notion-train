import {save} from "./NotionApi";

export type Stat = {
    name: string,
    player: string,
    match: string
};

export async function createStat(stat: Stat): Promise<void> {
    type StatDTO = {
        Nombre: {
            title: Array<{
                text: {
                    content: string;
                };
            }>;
        },
        Jugador: {
            relation: Array<{
                id: string;
            }>
        },
        Partido: {
            relation: Array<{
                id: string;
            }>
        },
        Convocatoria: {
            select: {
                name: string
            }
        }
    }

    const statDTO: StatDTO = {
        Nombre: {
            title: [
                {
                    text: {
                        content: stat.name
                    }
                }
            ]
        },
        Jugador: {
            relation: [
                {
                    id: stat.player
                }
            ]
        },
        Partido: {
            relation: [
                {
                    id: stat.match
                }
            ]
        },
        Convocatoria: {
            select: {
                name: "Convocado"
            }
        }
    };

    await save('da93aaada4f9460a8e9fa3c0f24a183a', undefined, statDTO);
}
