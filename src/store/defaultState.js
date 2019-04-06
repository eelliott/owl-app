const OverwatchLeague = require('overwatchleague');
const OWL = new OverwatchLeague();


export const defaultState = {
    OWL: OWL,
    rankings: OWL.getRankings().then(res => {
        console.log(res.data);
        return res.data;
    }),
    teams: OWL.getTeams().then(res => {
        console.log(res.data);
        return res.data;
    })
}
