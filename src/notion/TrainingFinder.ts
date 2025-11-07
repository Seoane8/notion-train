import {query} from "./NotionApi";
import config from "../utils/Configuration";

const DB: string = config.TRAINING_DB;

export type TrainingId = string;

export async function getTrainings(): Promise<Array<TrainingId>> {
    type TrainingDTO = {
        id: string;
    };

    const body: any = {
        "filter": {
            "property": "Asistencia Cargada",
            "formula": {
                "checkbox": {
                    "equals": false
                }
            }
        }
    }

    const data: Array<TrainingDTO> = await query<TrainingDTO>(DB, body);

    return data.map((training: TrainingDTO): TrainingId => training.id);
}
