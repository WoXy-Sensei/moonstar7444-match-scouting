<script setup lang="ts">
import api from "@/api/teams";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import TeamCol from "@/components/TeamCol.vue";

const route = useRoute();

const teams = ref([]) as any;
const getTeams = async (competitionId: string | string[] | undefined | null = null) => {
  try {
    const getTeamsData = await api.getTeams(competitionId);
    teams.value = getTeamsData.data;
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => route.params,
  (toParams) => {
    getTeams(toParams.competitionId);
  }
);

onMounted(() => {
  getTeams();
});
</script>

<template>
  <div class="page">
    <div role="tablist" class="tabs tabs-bordered">
      <router-link to="/teams/0" custom v-slot="{ href, navigate, isActive }">
        <a
          :active="isActive"
          :href="href"
          :class="{ 'tab-active': isActive }"
          @click="navigate"
          role="tab"
          class="tab"
          >Istanbul Regional</a
        >
      </router-link>
      <router-link to="/teams/1" custom v-slot="{ href, navigate, isActive }">
        <a
          :active="isActive"
          :href="href"
          :class="{ 'tab-active': isActive }"
          @click="navigate"
          role="tab"
          class="tab"
          >Haliç Regional</a
        >
      </router-link>
    </div>
    <div role="tablist" class="tabs tabs-bordered">
      <router-link to="/teams/2" custom v-slot="{ href, navigate, isActive }">
        <a
          :active="isActive"
          :href="href"
          :class="{ 'tab-active': isActive }"
          @click="navigate"
          role="tab"
          class="tab"
          >Aerospace Valley Regional</a
        >
      </router-link>
      <router-link to="/teams/3" custom v-slot="{ href, navigate, isActive }">
        <a
          :active="isActive"
          :href="href"
          :class="{ 'tab-active': isActive }"
          @click="navigate"
          role="tab"
          class="tab"
          >Championship 2024</a
        >
      </router-link>
    </div>

    <div class="flex flex-col w-full place-items-center p-5" style="height: 100%">
      <article class="prose flex justfiy-center flex-col items-center mb-5">
        <h1 class="">View Teams</h1>
      </article>
      <div v-for="(team, index) in teams" :key="index">
        <TeamCol :team="team" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tab-active {
  border-color: red !important;
}
</style>
