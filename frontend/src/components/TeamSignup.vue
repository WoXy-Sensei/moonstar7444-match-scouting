<script setup lang="ts">
import { watch } from "vue";
import { useRobotStore } from "@/stores/robot";
import api from "@/api/teams";

import RobotField from "@/components/RobotField.vue";

const useRobot = useRobotStore();
const data = useRobot.data;

const getTeam = async (teamNumber: Number) => {
  try {
    const team = await api.getTeam(teamNumber);
    return team.data;
  } catch (error) {
    return "Team not found";
  }
};

const saveTeam = async () => {
  try {
    console.log(data);
    
    const team = await api.saveTeam(data);
    console.log(team);

    return team.data;
  } catch (error) {
    console.log(error);
    
    return "Team not found";
  }
};

watch(
  () => data.teamNumber,
  async (newteamNumber) => {
    if (newteamNumber.length >= 3) {
      const team = await getTeam(newteamNumber);
      data.teamName = team.name;
      data.teamCountry = team.country;
      data.rookieYear = team.rookie_year;
    }
  }
);
</script>

<template>
  <form @submit.prevent="saveTeam">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Competition ? </span>
      </label>
      <div>
        <div class="flex items-center justify-center gap-5">
          <label class="label cursor-pointer bg-base-200 p-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              checked
              value="test2"
              v-model="data.competition"
            />
            <span class="label-text m-3">competition 1</span>
          </label>
          <label class="label cursor-pointer bg-base-200 p-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              checked
              value="test2"
              v-model="data.competition"
            />
            <span class="label-text m-3">competition 1</span>
          </label>
        </div>
        <div class="flex items-center justify-center gap-5">
          <label class="label cursor-pointer bg-base-200 p-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              checked
              value="test2"
              v-model="data.competition"
            />
            <span class="label-text m-3">competition 1</span>
          </label>
          <label class="label cursor-pointer bg-base-200 p-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              checked
              value="test2"
              v-model="data.competition"
            />
            <span class="label-text m-3">competition 1</span>
          </label>
        </div>
      </div>

      <label class="label">
        <span class="label-text"
          >Team Number ? <span class="badge badge-error ml-2 text-white">xxyy</span></span
        >
      </label>
      <input
        type="text"
        placeholder="Number"
        class="input input-bordered w-full border-red-500"
        maxlength="4"
        v-model="data.teamNumber"
        required
      />
      <label class="label">
        <span class="label-text">Team Name ?</span>
      </label>
      <input
        type="text"
        placeholder="Team Name"
        class="input input-bordered w-full border-red-500"
        disabled
        v-model="data.teamName"
      />
      <div class="flex gap-5">
        <div>
          <label class="label">
            <span class="label-text">Country</span>
          </label>
          <input
            type="text"
            placeholder="Team Country"
            class="input input-bordered w-full border-red-500"
            disabled
            v-model="data.teamCountry"
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text">Rookie Year</span>
          </label>
          <input
            type="text"
            placeholder="Rookie Year"
            class="input input-bordered w-full border-red-500"
            disabled
            v-model="data.rookieYear"
          />
        </div>
      </div>
      <label class="label">
        <span class="label-text"
          >Robot Weight ? <span class="badge badge-error ml-2 text-white">KG</span></span
        >
      </label>
      <input
        type="number"
        placeholder="Robot Weight ?"
        class="input input-bordered w-full border-red-500"
        v-model="data.robotWeight"
      />
      <label class="label">
        <span class="label-text"
          >Robot Height ? <span class="badge badge-error ml-2 text-white">CM</span></span
        >
      </label>
      <input
        type="number"
        placeholder="Robot Height ?"
        class="input input-bordered w-full border-red-500"
        v-model="data.robotHeight"
      />

      <label class="label text-center justify-center">
        <span class="label-text text-xl"
          >Robot Measurement ?
          <span class="badge badge-error ml-2 text-white">CM</span></span
        >
      </label>
      <RobotField />

      <label class="label">
        <span class="label-text">Motor Type ?</span>
      </label>
      <select class="select select-bordered border-red-500" v-model="data.motorType">
        <option disabled selected value="">Pick one</option>
        <option value="neo">NEO</option>
        <option value="falcon">Falcon</option>
        <option value="kraken">Kraken</option>
        <option value="cim">CIM</option>
      </select>

      <label class="label">
        <span class="label-text">Drive Type ?</span>
      </label>
      <select class="select select-bordered border-red-500" v-model="data.driveType">
        <option disabled selected value="">Pick one</option>
        <option value="swerve">Swerve</option>
        <option value="omni">Omni</option>
        <option value="hdrive">H Drive</option>
        <option value="wcd">WCD</option>
        <option value="mecanum">Mecanum</option>
        <option value="tankdrive">Tank Drive (Andymark)</option>
      </select>
      <label class="label">
        <span class="label-text">Description</span>
      </label>
      <textarea
        class="textarea textarea-bordered border-red-500"
        placeholder="Description"
        v-model="data.description"
      ></textarea>
      <label class="label">
        <span class="label-text">Rating ?</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        class="range"
        step="10"
        style="--range-shdw: rgb(239, 68, 68)"
        v-model="data.teamRating"
      />
      <div class="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>

    <button class="btn btn-block bg-red-500 mt-5" type="submit">Submit</button>
  </form>
</template>

<style scoped lang="scss"></style>
