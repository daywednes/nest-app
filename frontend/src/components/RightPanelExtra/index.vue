<template>
  <div
    ref="leftPanel"
    :class="{ showLeft: showLeft }"
    class="leftPanel-container"
  >
    <div class="leftPanel-background" />
    <FontResizableContainer increment="2px" class="leftPanel">
      <div
        class="handle-button"
        :style="{ 'background-color': theme }"
        @click="showLeft = !showLeft"
      >
        <i :class="showLeft ? 'el-icon-close' : 'el-icon-search'" />
      </div>
      <div class="leftPanel-items">
        <slot />
      </div>
    </FontResizableContainer>
  </div>
</template>

<script>
import { addClass, removeClass } from '@/utils';
import FontResizableContainer from '@/components/FontResizableContainer';

export default {
  name: 'LeftPanelExtra',
  components: {
    FontResizableContainer,
  },
  props: {
    clickNotClose: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      showLeft: false,
    };
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme;
    },
  },
  watch: {
    showLeft(value) {
      if (value) {
        this.$emit('leftPanelIsShow');
      } else {
        this.$emit('leftPanelIsHide');
      }
    },
  },
  beforeDestroy() {
    const elx = this.$refs.leftPanel;
    if (elx) {
      elx.remove();
    }
  },
};
</script>

<style lang="scss" scoped>
.leftPanel-background {
  position: relative;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.leftPanel {
  float: right;
  width: 100%;
  max-width: 660px;
  height: 100%;
  margin-right: -710px;
  position: relative;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.showLeft {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .leftPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .leftPanel {
    margin-left: 0px;
    margin-right: 5px;
    // transform: translate(100%);
  }
}
.handle-button {
  width: 26px;
  height: 36px;
  position: absolute;
  left: -30px;
  text-align: center;
  font-size: 16px;
  // border-radius: p16px 0px 0x 16px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 40px;
  i {
    font-size: 20px;
    line-height: 26px;
  }
}
</style>
