import api from './session'

export default {
  getTeam(teamNumber: number) {
    return api.get(`https://api.statbotics.io/v2/team/${teamNumber}`)
  },
  saveTeam(body: any) {
    return api.post(`http://localhost:3000/api/team`, { ...body })
  }
}
