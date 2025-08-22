import {query} from "./NotionApi";
import { NotionUpdate } from "./NotionUpdates";
import config from "../utils/Configuration";

const DB: string = config.TRAINING_DB;

export type TrainingId = string;

export async function getTrainings(update: NotionUpdate): Promise<Array<TrainingId>> {
    type TrainingDTO = {
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

    const data: Array<TrainingDTO> = await query<TrainingDTO>(DB, body);

    return data.map((training: TrainingDTO): TrainingId => training.id);
}
