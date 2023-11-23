<script setup lang="ts">

const prop = defineProps(['team'])
const team = prop.team

</script>

<template>
  <div class="collapse collapse-arrow bg-base-200 mt-5 border-2 border-red-500" style="z-index: 0; width:100%">
    <input type="checkbox" :name="team.teamNumber" />
    <div class="collapse-title text-xl font-medium">
      {{ team.teamName }} #{{ team.teamNumber }}
    </div>
    <div class="collapse-content text-center flex flex-col gap-5">
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Team Number</div>
          <div class="stat-value">{{ team.teamNumber }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Country</div>
          <div class="stat-value">{{ team.teamCountry }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Rookie Year</div>
          <div class="stat-value">{{ team.rookieYear }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Competition</div>
          <div class="stat-value">{{ team.teamCompetition }}</div>
        </div>
      </div>
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Drive Motor Type</div>
          <div class="stat-value">{{ team.motorType }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Drive Type</div>
          <div class="stat-value">{{ team.driveType }}</div>
        </div>
      </div>

      <div class="stats stats-vertical lg:stats-horizontal shadow flex">
        <div>
          <div class="stat">
            <div class="stat-title">Left</div>
            <div class="stat-value">{{ team.robotMeasurement.left }}</div>
            <div class="stat-desc flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Right</div>
            <div class="stat-value">{{ team.robotMeasurement.right }}</div>
            <div class="stat-desc flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="border-none">
          <div class="stat">
            <div class="stat-title">Front</div>
            <div class="stat-value">{{ team.robotMeasurement.front }}</div>
            <div class="stat-desc flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Back</div>
            <div class="stat-value">{{ team.robotMeasurement.back }}</div>
            <div class="stat-desc flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v16.19l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l2.47 2.47V3a.75.75 0 01.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Robot Weight (KG)</div>
          <div class="stat-value">{{ team.robotWeight }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Robot Height (CM)</div>
          <div class="stat-value">{{ team.robotHeight }}</div>
        </div>
      </div>

      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Rating (%)</div>
          <div class="stat-value">
            <div
              class="radial-progress color-red-500 m-5"
              :style="{ '--value': team.teamRating, 'font-size': '1.4rem' }"
              role="progressbar"
            >
              {{ team.teamRating }}%
            </div>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">Description</div>
          <div class="stat-desc w-100" style="text-wrap: pretty; font-size: 1rem">
            {{ team.teamDescription }}
          </div>
        </div>
      </div>

      <img :src="team.image" alt="" style="width: 100%;"/>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
