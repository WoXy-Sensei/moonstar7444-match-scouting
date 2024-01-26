<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { useMatchTeamStore } from "@/stores/matchTeam";
import api from "@/api/teams";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import _ from "lodash";

const useMatchTeam = useMatchTeamStore();
const refForm = ref();
const startPoistionImage = ref();
const startPositionCircle = ref();
const loading = ref(false);


onMounted(() => {
  startPoistionImage.value.addEventListener("click", (e: any) => {
    startPositionCircle.value.classList.remove("hidden");
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startPositionCircle.value.style.left = `${x}px`;
    startPositionCircle.value.style.top = `${y}px`;

    console.log(x, y);

    useMatchTeam.startPosition.x = x;
    useMatchTeam.startPosition.y = y;
  });
});

const setTeamMatch = async () => {
  try {
    const body = {
      teamNumber: useMatchTeam.teamNumber,
      teamName: useMatchTeam.teamName,
      competitionId: useMatchTeam.competitionId,
      startPositionX: useMatchTeam.startPosition.x,
      startPositionY: useMatchTeam.startPosition.y,
      failedAutonomous : useMatchTeam.failedAutonomous as boolean,
      autonomousAmpNotes: useMatchTeam.autonomous.ampNotes,
      autonomousSpeakerNotes: useMatchTeam.autonomous.speakerNotes,
      autonomousLeftStartingZone: useMatchTeam.autonomous.leftStartingZone,
      ampNotes: useMatchTeam.teleop.ampNotes,
      speakerNotes: useMatchTeam.teleop.speakerNotes,
      defenseRating: useMatchTeam.teleop.defenseRating,
      driveRating: useMatchTeam.teleop.driveRating,
      endLocation: useMatchTeam.endGame.endLocation,
      failedClimb: useMatchTeam.endGame.failedClimb,
      failedTeleop: useMatchTeam.teleop.failedTeleop,
      trapNote: useMatchTeam.endGame.trapNote,
      comments: useMatchTeam.endGame.comments,
    };
    loading.value = true;
    const team = await api.setTeamMatch(body);
    console.log(team);

    if (team.status === 400) {
      toast.error(" error ", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    toast.success("Completed Successfully", {
      autoClose: 5000,
      theme: "dark",
    });

    loading.value = false;

    useMatchTeam.$reset();
    refForm.value.reset();

    return team;
  } catch (error) {
    console.log(error);

    toast.error("error", {
      autoClose: 3000,
      theme: "dark",
    });
  }
};

const getTeamFromNumber = _.debounce(async (teamNumber: string) => {
  if (teamNumber.length >= 3) {
    try {
      const team = await api.getTeam(teamNumber);
      useMatchTeam.teamName = team.data.name;
    } catch (error) {
      useMatchTeam.teamName = "Team not found";
    }
  }
}, 300);

watch(
  () => useMatchTeam.teamNumber,
  (teamNumber) => {
    getTeamFromNumber(teamNumber);
  }
);
</script>

<template>
  <form @submit.prevent="setTeamMatch" ref="refForm">
    <div class="form-control w-full">
     
        
      <label class="label">
        <span class="label-text">Regeional ? </span>
      </label>
      <select
        class="select select-error w-full"
        v-model="useMatchTeam.competitionId"
      >
        <option disabled selected>Select</option>
        <option value="0">Istanbul Regional</option>
        <option value="1">Haliç Regional</option>
        <option value="2">Aerospace Valley Regional</option>
        <option value="3">Championship 2024</option>
      </select>
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
        v-model="useMatchTeam.teamNumber"
        required
      />
      <label class="label">
        <span class="label-text">Team Name</span>
      </label>
      <input
        type="text"
        placeholder="Team Name"
        class="input input-bordered w-full border-red-500"
        disabled
        v-model="useMatchTeam.teamName"
      />

      <label class="label">
        <span class="label-text">Start Poistion</span>
      </label>
      <div class="relative">
        <img
          src="https://cdn.discordapp.com/attachments/1028745287180750998/1199395015026290748/2160xDarkFixed.png?ex=65c262a7&is=65afeda7&hm=9d190293df9a0be69b8451effe74dd3fea6141978f06451ab1220d13dbf97264&"
          ref="startPoistionImage"
          style="width: 400px; height: 200px"
        />
        <div
          class="circle w-3 h-3 bg-red-500 absolute rounded-full hidden"
          ref="startPositionCircle"
        ></div>
      </div>

      <h1 class="text-3xl text-white-500 font-bold text-center m-5">Autonomous</h1>
      <hr />

      <button type="button" class="btn btn-block  bg-red-950 text-white mt-5" id="autonomDisabled" ref="failButton" @click="!useMatchTeam.failedAutonomous ? useMatchTeam.failedAutonomous = true : useMatchTeam.failedAutonomous = false">Fail Autonomous <span v-if="useMatchTeam.failedAutonomous"> 💔 </span> </button>

      <div class="flex gap-5">
        <div>
          <label class="label">
            <span class="label-text">Amp Notes ? </span>
          </label>
          <div class="flex" >
            <button :disabled="useMatchTeam.failedAutonomous" class="btn btn-error font-bold text-white" type="button" @click="useMatchTeam.autonomous.ampNotes--">-</button>
            <input
              type="number"
              placeholder="Amp Notes"
              class="input input-bordered w-full border-red-500 text-center"
              maxlength="100"
              v-model="useMatchTeam.autonomous.ampNotes"
              required
              :disabled="useMatchTeam.failedAutonomous"
            />
            <button :disabled="useMatchTeam.failedAutonomous" class="btn btn-error text-white font-bold" type="button" @click="useMatchTeam.autonomous.ampNotes++">+</button>
          </div>
        </div>
        
        <div>
          <label class="label">
            <span class="label-text">Speaker Notes ? </span>
          </label>
          <div class="flex" >
            <button :disabled="useMatchTeam.failedAutonomous" class="btn btn-error font-bold text-white" type="button" @click="useMatchTeam.autonomous.speakerNotes--">-</button>
            <input
              type="number"
              placeholder="Amp Notes"
              class="input input-bordered w-full border-red-500 text-center"
              maxlength="100"
              v-model="useMatchTeam.autonomous.speakerNotes"
              required
              :disabled="useMatchTeam.failedAutonomous"
            />
            <button :disabled="useMatchTeam.failedAutonomous" class="btn btn-error text-white font-bold" type="button" @click="useMatchTeam.autonomous.speakerNotes++">+</button>
          </div>
        </div>
      </div>

      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Left Starting Zone ? </span>
          <input
            type="checkbox"
            checked
            class="checkbox checkbox-error"
            v-model="useMatchTeam.autonomous.leftStartingZone"
            :disabled="useMatchTeam.failedAutonomous"
          />
        </label>
      </div>

      <h1 class="text-3xl text-white-500 font-bold text-center m-5">Teleop</h1>
      <hr />

      <div class="flex gap-5">
        <div>
          <label class="label">
            <span class="label-text">Amp Notes ? </span>
          </label>
          <div class="flex" >
            <button  class="btn btn-error font-bold text-white" type="button" @click="useMatchTeam.teleop.ampNotes--">-</button>
            <input
              type="number"
              placeholder="Amp Notes"
              class="input input-bordered w-full border-red-500 text-center"
              maxlength="100"
              v-model="useMatchTeam.teleop.ampNotes"
              required
            />
            <button  class="btn btn-error text-white font-bold" type="button" @click="useMatchTeam.teleop.ampNotes++">+</button>
          </div>
        </div>
        <div>
          <label class="label">
            <span class="label-text">Speaker Notes ? </span>
          </label>
          <div class="flex" >
            <button class="btn btn-error font-bold text-white" type="button" @click="useMatchTeam.teleop.speakerNotes--">-</button>
            <input
              type="number"
              placeholder="Amp Notes"
              class="input input-bordered w-full border-red-500 text-center"
              maxlength="100"
              v-model="useMatchTeam.teleop.speakerNotes"
              required
            />
            <button  class="btn btn-error text-white font-bold" type="button" @click="useMatchTeam.teleop.speakerNotes++">+</button>
          </div>
        </div>
        </div>
        
      </div>

      

      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Failed Teleop</span>
          <input
            type="checkbox"
            checked
            class="checkbox checkbox-error"
            v-model="useMatchTeam.teleop.failedTeleop"
          />
        </label>
      </div>

      <label class="label">
        <span class="label-text">Defense Rating ?</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        class="range"
        step="10"
        style="--range-shdw: rgb(239, 68, 68)"
        v-model="useMatchTeam.teleop.defenseRating"
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

      <label class="label">
        <span class="label-text">Drive Rating ?</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        class="range"
        step="10"
        style="--range-shdw: rgb(239, 68, 68)"
        v-model="useMatchTeam.teleop.driveRating"
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


      <h1 class="text-3xl text-white-500 font-bold text-center m-5">End Game</h1>
      <hr />

      <div class="mt-5">
        <img
          src="https://cdn.discordapp.com/attachments/1028745287180750998/1199404730015813632/stage.png?ex=65c26bb3&is=65aff6b3&hm=3699fbe04a7ae4de25bc9966f445d4979cfb027b9a67c65048bf25c125ea8ee5&"
          alt=""
          class="w-full"
        />
      </div>

      <label class="label">
        <span class="label-text">End Location ? </span>
      </label>
      <select
        class="select select-error w-full"
        v-model="useMatchTeam.endGame.endLocation"
      >
        <option disabled selected>Select</option>
        <option value="stage-left">Stage Left</option>
        <option value="center-stage">Center Stage</option>
        <option value="stage-right">Stage Right</option>
        <option value="stage">Stage</option>
      </select>

      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Failed Climb</span>
          <input
            type="checkbox"
            checked
            class="checkbox checkbox-error"
            v-model="useMatchTeam.endGame.failedClimb"
          />
        </label>
      </div>

      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Trap Note</span>
          <input
            type="checkbox"
            checked
            class="checkbox checkbox-error"
            v-model="useMatchTeam.endGame.trapNote"
          />
        </label>
      </div>

    
      <label class="label">
        <span class="label-text"> Comments </span>
      </label>
      <textarea
        class="textarea textarea-bordered border-red-500 w-full"
        placeholder="Write something..."
        v-model="useMatchTeam.endGame.comments"
      ></textarea>
 


    <button class="btn btn-block bg-red-500 mt-5" type="submit">Submit</button>
  </form>

  <div class="loadPopup flex flex-col gap-5" v-if="loading">
    <span class="text-3xl font-bold">Loading...</span>
    <span class="loading loading-spinner text-error loading-lg" style="height:50px"></span>
  </div>
</template>

<style scoped lang="scss">

.loadPopup {
  position: fixed;
  transform: translateY(50%);
  z-index: 9999;
  width: 400px;
  height: 400px;
  background: rgb(2, 2, 2);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
}

</style>
