<script setup lang="ts">
import TeamSignup from "@/components/TeamSignup.vue";
</script>

<template>
  <div class="flex flex-col w-full place-items-center p-5">
    <article class="prose flex justfiy-center flex-col items-center mb-5">
      <h1 class="">Pit Scouting</h1>
      <p>Moon Star Robotics <span class="text-red-500"> 7444 </span> Pit Scouting App</p>

      <label class="swap swap-flip text-9xl">
        <input type="checkbox" />
        <div class="swap-off">
          <img src="../assets/img/logo-white.svg" alt="" class="m-0"/>
        </div>
        <div class="swap-on">❤</div>
      </label>
      
    </article>
    <router-link to="/team" class="btn btn-block bg-red-500 mt-5">Save Team</router-link>
    <router-link to="/team" class="btn btn-block bg-red-500 mt-5">View Teams</router-link>
  </div>
</template>
