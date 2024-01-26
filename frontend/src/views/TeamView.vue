<script setup lang="ts">
import api from "@/api/teams";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getByArrayBoolean, getByArrayNumber, calcAvarage } from "@/utils/functions";

const rotue = useRoute();
const competition = ref("0");

const data = ref([]) as any;

const teams = ref([]) as any;

const getTeamFromNumber = async (teamNumber: string) => {
  const team = await api.getTeamMatch(competition.value, teamNumber);
  data.value = team.data;
};

watch(
  () => rotue.params.teamNumber,
  (_teamNumber: any) => {
    getTeamFromNumber(_teamNumber);
  }
);

onMounted(async () => {
  const teamsData = await api.getTeams(competition.value);
  teams.value = teamsData.data;
});
</script>

<template>
  <div class="page p-5">
    <div>
      <label class="label">
        <span class="label-text">Regeional ? </span>
      </label>
      <select class="select select-error w-full" v-model="competition">
        <option disabled selected>Select</option>
        <option value="0">Istanbul Regional</option>
        <option value="1">Haliç Regional</option>
        <option value="2">Aerospace Valley Regional</option>
        <option value="3">Championship 2024</option>
      </select>
    </div>
    <div v-if="rotue.params.teamNumber != null">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Match</th>
              <th>Start Pos</th>
              <th>Failed Autonomous</th>
              <th>Auto Amp</th>
              <th>Auto Speaker</th>
              <th>Auto Left Starting Zone</th>

              <th>Teleop Amp</th>
              <th>Teleop Speaker</th>
              <th>Defense Rating</th>
              <th>Drive Rating</th>
              <th>Failed Teleop</th>

              <th>End Location</th>
              <th>Failed Climb</th>
              <th>Trap Note</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-base-100" v-for="team in data" :key="team._id">
              <th>#{{ team.match }}</th>
              <td>
                <button
                  class="btn"
                  :onclick="
                    team.teamName.replace(/\s/g, '') +
                    team.competitionId +
                    team.match +
                    'startPos' +
                    '.showModal()'
                  "
                >
                  Starting Pos
                </button>
              </td>
              <td>{{ team.failedAutonomous }}</td>
              <td>{{ team.autonomous.ampNotes }}</td>
              <td>{{ team.autonomous.speakerNotes }}</td>
              <td>{{ team.autonomous.leftStartingZone }}</td>

              <td>{{ team.teleop.ampNotes }}</td>
              <td>{{ team.teleop.speakerNotes }}</td>
              <td>{{ team.teleop.defenseRating }}</td>
              <td>{{ team.teleop.driveRating }}</td>
              <td>{{ team.teleop.failedTeleop }}</td>
              <td>{{ team.endGame.endLocation }}</td>
              <td>{{ team.endGame.failedClimb }}</td>
              <td>{{ team.endGame.trapNote }}</td>
              <td>
                <button
                  class="btn"
                  :onclick="
                    team.teamName.replace(/\s/g, '') +
                    team.competitionId +
                    team.match +
                    'comment' +
                    '.showModal()'
                  "
                >
                  Comment
                </button>
              </td>

              <dialog
                :id="
                  team.teamName.replace(/\s/g, '') +
                  team.competitionId +
                  team.match +
                  'startPos'
                "
                class="modal"
              >
                <div class="modal-box">
                  <form method="dialog">
                    <button
                      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <div class="relative">
                    <img
                      style="width: 400px; height: 200px"
                      src="https://cdn.discordapp.com/attachments/1028745287180750998/1199395015026290748/2160xDarkFixed.png?ex=65c262a7&is=65afeda7&hm=9d190293df9a0be69b8451effe74dd3fea6141978f06451ab1220d13dbf97264&"
                      alt=""
                    />
                    <div
                      class="circle w-3 h-3 bg-red-500 absolute rounded-full"
                      :style="{
                        top: team.startPosition.y + 'px',
                        left: team.startPosition.x + 'px',
                      }"
                    ></div>
                  </div>
                </div>
              </dialog>
              <dialog
                :id="
                  team.teamName.replace(/\s/g, '') +
                  team.competitionId +
                  team.match +
                  'comment'
                "
                class="modal"
              >
                <div class="modal-box">
                  <form method="dialog">
                    <button
                      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  {{ team.endGame.comments }}
                </div>
              </dialog>
            </tr>

            <tr class="bg-base-200">
              <th>AVG</th>
              <td>-</td>

              <td class="font-bold">
                {{ calcAvarage(getByArrayBoolean(data, ["failedAutonomous"])) * 100 }}%
              </td>
              <td class="font-bold">
                {{ calcAvarage(getByArrayNumber(data, ["autonomous", "ampNotes"])) }}
              </td>
              <td class="font-bold">
                {{ calcAvarage(getByArrayNumber(data, ["autonomous", "speakerNotes"])) }}
              </td>
              <td class="font-bold">
                {{
                  calcAvarage(
                    getByArrayBoolean(data, ["autonomous", "leftStartingZone"])
                  ) * 100
                }}%
              </td>

              <td class="font-bold">
                {{ calcAvarage(getByArrayNumber(data, ["teleop", "ampNotes"])) }}
              </td>
              <td class="font-bold">
                {{ calcAvarage(getByArrayNumber(data, ["teleop", "speakerNotes"])) }}
              </td>
              <td class="font-bold">
                {{ calcAvarage(getByArrayNumber(data, ["teleop", "defenseRating"])) }}
              </td>
              <td class="font-bold">
                {{ calcAvarage(getByArrayNumber(data, ["teleop", "driveRating"])) }}
              </td>
              <td class="font-bold">
                {{
                  calcAvarage(getByArrayBoolean(data, ["teleop", "failedTeleop"])) * 100
                }}%
              </td>

              <td>-</td>
              <td class="font-bold">
                {{
                  calcAvarage(getByArrayBoolean(data, ["endGame", "failedClimb"])) * 100
                }}%
              </td>
              <td class="font-bold">
                {{ calcAvarage(getByArrayBoolean(data, ["endGame", "trapNote"])) * 100 }}%
              </td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="rotue.params.teamNumber == null"
      class="mt-5 flex flex-wrap justify-center gap-3"
    >
      <div
        class="card w-96 bg-base-100 shadow-xl border border-error"
        v-for="team in teams"
        :key="team._id"
      >
        <div class="card-body justify-center items-center text-center">
          <h2 class="card-title text-3xl">{{ team.teamName }}</h2>
          <p class="font-bold text-xl mb-5">#{{ team.teamNumber }}</p>
          <div class="card-actions justify-center">
            <RouterLink :to="'teams/' + team.teamNumber">
              <button class="btn btn-error text-white">Details</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
