import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRobotStore = defineStore('robot', () => {
  const data = reactive({ teamNumber: '', teamName: '', motorType: '',driveType:'' ,robotMeasurement:{front : '', back : '', left : '', right : ''}})

  return { data }
})
