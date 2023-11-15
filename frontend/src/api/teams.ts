import api from './session'


export default {
  getTeam(teamNumber: string) {
    return api.get(`https://api.statbotics.io/v2/team/${teamNumber}`)
  },
  setTeam(body: any) {    
    console.log(body);
    
    return api.post(`http://localhost:5000/api/v1/teams`, { ...body })
  },
  getTeams() {
    return api.get(`http://localhost:5000/api/v1/teams`)
  }
}
