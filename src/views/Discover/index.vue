<template>
  <div class="home">
    <h1>Discover</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Discover extends Vue {}
</script>
