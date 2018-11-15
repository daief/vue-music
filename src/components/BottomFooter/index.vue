<template>
  <div class="bottom-footer">
    <div class="wrap">
      <div class="left">
        <p class="p-1">
          <a href="https://music.163.com/about" target="_blank" class="c-p-line about">关于网易</a>
        </p>
        <p class="p-2">
          真正的 163 ===> <a href="https://music.163.com" target="_blank" class="c-p-line about">https://music.163.com</a>
        </p>
        <p class="p-2">{{emoji}}</p>
      </div>
      <div class="right">
        <!-- TODO -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BottomFooter extends Vue {
  public emojis: string[] = [
    '(*￣∇￣*)',
    'ㄟ(▔,▔)ㄏ',
    '(～o￣3￣)～',
    '(;´▽`)y-~~',
    'ヾ(=･ω･=)o',
    'ﾍ|･∀･|ﾉ*~●',
    '(๑•̀ㅂ•́)و✧',
    'ヽ(°▽、°)ﾉ',
    'O(∩_∩)O',
    '(*≧∪≦)',
  ];

  public emoji: string = '';

  public randomEmoji() {
    this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
  }

  public mounted() {
    this.randomEmoji();
    window.addEventListener('visibilitychange', this.randomEmoji);
  }

  public beforeDestroy() {
    window.removeEventListener('visibilitychange', this.randomEmoji);
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/variables.less';

.bottom-footer {
  height: 150px;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;

  .wrap {
    width: @content-width;
    height: 100%;
    margin: 0 auto;

    .left {
      padding-top: 15px;

      p {
        margin: 0
      }

      .p-1 {
        line-height: 24px;

        .about {
          .set-a(#999, #999, #999);
          &:hover {
            text-decoration: underline;
          }
        } // .about
      } // .p-1

      .p-2 {
        line-height: 24px;
        color: #666;
        a {
          .set-a(#333, #333, #333, underline);
        }
      } // .p-2
    } // .left
  } // .wrap
} // .bottom-footer
</style>
