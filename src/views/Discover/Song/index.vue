<template>
  <div class="song main-content">
    song-{{$route.query.id}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Song extends Vue {}
</script>

<style lang="less" scoped>
@import './style.less';
</style>
