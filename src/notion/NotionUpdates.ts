import {query, save} from "./NotionApi";
import moment, {Moment} from "moment";

export type NotionUpdate = {
    from: Moment;
    to: Moment;
};

export async function getLastUpdate(): Promise<NotionUpdate> {
    type NotionUpdateDTO = {
        id: string;
        properties: {
            Desde: {
                date: {
                    start: Date
                }
            },
            Hasta: {
                date: {
                    start: Date
                }
            };
        };
    };

    const body: any = {
        "sorts": [
            {
                "property": "Hasta",
                "direction": "descending"
            }
        ],
        "page_size": 1
    }
    const data: Array<NotionUpdateDTO> = await query<NotionUpdateDTO>("ebc2d5de642f488f8ff1f559625638da", body);

    return {
        from: moment(data.at(0).properties.Desde.date.start),
        to: moment(data.at(0).properties.Hasta.date.start)
    }
}

export async function createUpdate(update: NotionUpdate): Promise<void> {
    type NotionUpdateDTO = {
        Desde: {
            date: {
                start: Moment
            }
        },
        Hasta: {
            date: {
                start: Moment
            }
        };
    };

    const updateDTO: NotionUpdateDTO = {
        Desde: {
            date: {
                start: update.from
            }
        },
        Hasta: {
            date: {
                start: update.to
            }
        }
    }

    const icon = undefined

    await save('ebc2d5de642f488f8ff1f559625638da', icon, updateDTO);
}
