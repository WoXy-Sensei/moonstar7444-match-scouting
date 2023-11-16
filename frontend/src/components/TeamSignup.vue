<script setup lang="ts">
import { watch } from "vue";
import { useRobotStore } from "@/stores/robot";
import api from "@/api/teams";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import RobotField from "@/components/RobotField.vue";
import { ref } from "vue";

const useRobot = useRobotStore();
const data = useRobot;
const refForm = ref();

const getTeam = async (teamNumber: string) => {
  try {
    const team = await api.getTeam(teamNumber);
    return team.data;
  } catch (error) {
    return false;
  }
};

const setTeam = async () => {
  try {
    const body = {
      image: data.image,
      teamNumber: data.teamNumber,
      teamName: data.teamName,
      teamCountry: data.teamCountry,
      rookieYear: data.rookieYear,
      robotWeight: data.robotWeight,
      robotHeight: data.robotHeight,
      front: data.robotMeasurement.front,
      back: data.robotMeasurement.back,
      left: data.robotMeasurement.left,
      right: data.robotMeasurement.right,
      motorType: data.motorType,
      driveType: data.driveType,
      description: data.description,
      teamRating: data.teamRating,
      competition: data.competition,
    };

    const team = await api.setTeam(body);
    toast.success("Completed Successfully", {
      autoClose: 5000,
      theme: "dark",
    });
    useRobot.$reset();
    refForm.value.reset();

    return team;
  } catch (error) {
    console.log(error);

    toast.error("ERROR", {
      autoClose: 5000,
      theme: "dark",
    });
  }
};

const handleImage = async (e: any) => {
  data.image = e.target.files[0];
};

watch(
  () => data.teamNumber,
  async (newteamNumber: string) => {
    if (newteamNumber.length >= 3) {
      const team = await getTeam(newteamNumber);
      console.log(team);
      if (!team) {
        data.teamName = "Team not found";
        data.teamCountry = "Team not found";
        data.rookieYear = "Team not found";
        return;
      }
      data.teamName = team.name;
      data.teamCountry = team.country;
      data.rookieYear = team.rookie_year;
    }
  }
);
</script>

<template>
  <form @submit.prevent="setTeam" ref="refForm">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Competition ? </span>
      </label>
      <div>
        <div class="flex items-center justify-center gap-5">
          <label class="label cursor-pointer bg-base-200 p-1 h-20 flex-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              checked
              value="0"
              required
              v-model="data.competition"
            />
            <span class="label-text m-3">Istanbul Regional</span>
          </label>
          <label class="label cursor-pointer bg-base-200 p-1 h-20 flex-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              value="1"
              v-model="data.competition"
              required
            />
            <span class="label-text m-3">Haliç Regional</span>
          </label>
        </div>
        <div class="flex items-center justify-center gap-5">
          <label class="label cursor-pointer bg-base-200 p-1 h-20 flex-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              value="2"
              v-model="data.competition"
              required
            />
            <span class="label-text m-3">Aerospace Valley Regional</span>
          </label>
          <label class="label cursor-pointer bg-base-200 p-1 h-20 flex-1">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500 ml-3"
              value="3"
              v-model="data.competition"
              required
            />
            <span class="label-text m-3">Championship 2024</span>
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
        step="any"
        placeholder="Robot Weight ?"
        class="input input-bordered w-full border-red-500"
        v-model="data.robotWeight"
        required
      />
      <label class="label">
        <span class="label-text"
          >Robot Height ? <span class="badge badge-error ml-2 text-white">CM</span></span
        >
      </label>
      <input
        type="number"
        step="any"
        placeholder="Robot Height ?"
        class="input input-bordered w-full border-red-500"
        v-model="data.robotHeight"
        required
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
      <select
        class="select select-bordered border-red-500"
        v-model="data.motorType"
        required
      >
        <option disabled selected value="">Pick one</option>
        <option value="neo">NEO</option>
        <option value="falcon">Falcon</option>
        <option value="kraken">Kraken</option>
        <option value="cim">CIM</option>
      </select>

      <label class="label">
        <span class="label-text">Drive Type ?</span>
      </label>
      <select
        class="select select-bordered border-red-500"
        v-model="data.driveType"
        required
      >
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
        required
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

    <label class="label">
      <span class="label-text">Upload Image</span>
    </label>
    <input
      type="file"
      class="file-input file-input-bordered w-full max-w-xs"
      name="image"
      required
      @change="handleImage"
    />
    <button class="btn btn-block bg-red-500 mt-5" type="submit">Submit</button>
  </form>
</template>

<style scoped lang="scss"></style>
