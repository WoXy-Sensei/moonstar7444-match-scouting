import { defineStore } from 'pinia'

export const useRobotStore = defineStore('robot', {

  state: () => ({
    teamNumber: '',
    teamName: '',
    motorType: '',
    driveType: '',
    robotMeasurement: { front: null, back: null, left: null, right: null },
    teamRating: "50",
    teamCountry: '',
    rookieYear: '',
    competition: null,
    robotWeight: null,
    robotHeight: null,
    description: '',
    image: '' as any,
  })
})
