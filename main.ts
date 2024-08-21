import {createUpdate, getLastUpdate, NotionUpdate} from "./src/notion/NotionUpdates";
import moment from "moment/moment";
import {getTrainings, TrainingId} from "./src/notion/TrainingFinder";
import {getFirstTeamPlayers, Player} from "./src/notion/PlayerFinder";
import {Attendance, createAttendance} from "./src/notion/AttendanceCreator";
import {getMatches, MatchId} from "./src/notion/MatchesFinder";
import {createStat, Stat} from "./src/notion/StatsCreator";

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

console.log('Retrieving matches...')
const matches: Array<MatchId> = await getMatches(actualUpdate)
console.log({matches})

console.log('Retrieving players...')
const players: Array<Player> = await getFirstTeamPlayers()
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

console.log('Creating stats...')
for (const match of matches) {
    for (const player of players) {
        const stat: Stat = {
            name: player.name,
            player: player.id,
            match: match
        }
        await createStat(stat)
    }
}

console.log("Adding Update...")
await createUpdate(actualUpdate)
