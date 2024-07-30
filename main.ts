import {createUpdate, getLastUpdate, NotionUpdate} from "./src/notion/NotionUpdates";
import moment, {Moment} from "moment";
import { getTrainings, TrainingId } from "./src/notion/TrainingFinder";
import { getPlayers, Player } from "./src/notion/PlayerFinder";
import { Attendance, createAttendance } from "./src/notion/AttendanceCreator";

console.log("Retrieving last update...")
const lastUpdate: NotionUpdate = await getLastUpdate()
console.log('Last update: ' + lastUpdate)
const actualUpdate: NotionUpdate = {
    from: lastUpdate.to,
    to: moment()
}

console.log(`Processing trainings from ${actualUpdate.from} to ${actualUpdate.to}`)

console.log('Retrieving trainings...')
const trainings: Array<TrainingId> = await getTrainings(actualUpdate)
console.log({trainings})

console.log('Retrieving players...')
const players: Array<Player> = await getPlayers()
console.log({players})

console.log('Creating attendance...')
for (const training of trainings) {
    for (const player of players) {
        const attendance: Attendance = {
            name: player.name,
            player: player.id,
            train: training
        }
        await createAttendance(attendance)
    }
}

console.log("Adding Update...")
await createUpdate(actualUpdate)