import {query, save} from "./NotionApi";
import moment, {Moment} from "moment";
import config from "../utils/Configuration";

const DB: string = config.UPDATES_DB;

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
    const data: Array<NotionUpdateDTO> = await query<NotionUpdateDTO>(DB, body);

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

    await save(DB, icon, updateDTO);
}
