import {save} from "./NotionApi";
import config from "../utils/Configuration";

const DB: string = config.ATTENDANCE_DB;

export type Attendance = {
    name: string,
    player: string,
    train: string
};

export async function createAttendance(attendance: Attendance): Promise<void> {
    type AttendanceDTO = {
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
        Entrenamiento: {
            relation: Array<{
                id: string;
            }>
        },
        Tipo: {
            select: {
                name: string
            }
        }
    }

    const attendanceDTO: AttendanceDTO = {
        Nombre: {
            title: [
                {
                    text: {
                        content: attendance.name
                    }
                }
            ]
        },
        Jugador: {
            relation: [
                {
                    id: attendance.player
                }
            ]
        },
        Entrenamiento: {
            relation: [
                {
                    id: attendance.train
                }
            ]
        },
        Tipo: {
            select: {
                name: "Asiste"
            }
        }
    };

    await save(DB, undefined, attendanceDTO);
}
