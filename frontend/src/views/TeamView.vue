<script setup lang="ts">
import api from "@/api/teams";
import { reactive, onMounted } from "vue";

const teams = reactive({
  data: [],
});

const getTeams = async () => {
  try {
    const getTeamsData = await api.getTeams();
    teams.data = getTeamsData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getTeams();
});
</script>

<template>
  <div class="flex flex-col w-full place-items-center p-5" style="height: 100vh">
    <article class="prose flex justfiy-center flex-col items-center mb-5">
      <h1 class="">View Teams</h1>
    </article>

    <div v-for="(team, index) in teams.data" :key="index">
      <div class="collapse collapse-arrow bg-base-200 mt-5 border-2 border-red-500">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title text-xl font-medium">
          {{ team.teamName }} #{{ team.teamNumber }}
        </div>
        <div class="collapse-content">
          <p>{{ team }}</p>
          <div
            class="radial-progress color-red-500"
            :style="{ '--value': team.teamRating }"
            role="progressbar"
          >
            {{ team.teamRating }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
