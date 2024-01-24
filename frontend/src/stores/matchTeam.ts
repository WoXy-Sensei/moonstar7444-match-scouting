import { defineStore } from 'pinia'

export const useMatchTeamStore = defineStore('matchTeam', {

  state: () => ({
    teamName: '',
    teamNumber: '',
    competitionId:  "0",
    startPosition:{
      x: 0,
      y: 0,
    },
    failedAutonomous : false,
    autonomous: {
      ampNotes: 0,
      speakerNotes: 0,
      leftStartingZone: false,
    },
    teleop: {
      ampNotes: 0,
      speakerNotes: 0,
      defenseRating: '10',
      driveRating: '10',
      failedTeleop: false,
    },
    endGame: {
      endLocation: 'stage-left',
      failedClimb: false,
      trapNote : false,
      comments: '',
    },
  })
})
