<template>
  <div class="song">
    song-{{$route.query.id}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Song extends Vue {}
</script>
