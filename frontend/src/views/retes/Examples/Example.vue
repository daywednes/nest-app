<template lang="pug">
.example
  //- Info(:item="example")
  CommonFunction(
        style="float: right; margin-right: 10px; text-align: left; width:15%; height: 50px;"
        :isShowDeploy="true"
        @functionDeploy="fn_deploy")
        
  .view
    div(ref="view")
    div(ref="extra")
</template>

<script>
import Info from './Info';
import CommonFunction from '@/components/CommonFunction';

export default {
  props: ['example'],
  methods: {
    async init() {
      this.$refs.view.innerHTML = '';
      this.$refs.extra.innerHTML = '';
      this.$refs.extra.className = '';

      if (this.editor) this.editor.destroy();
      if (this.engine) this.engine.destroy();

      const { editor, engine } = await this.example.init(
        this.$refs.view,
        this.$refs.extra,
      );

      this.editor = editor;
      this.engine = engine;
    },
    fn_deploy() {
      alert('deploy');
    },
  },
  data() {
    return {
      editor: null,
      engine: null,
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.init();
  },
  components: {
    Info,
    CommonFunction,
  },
};
</script>

<style lang="sass" scoped>
@import '../assets/styles/media.sass'

.example
  display: flex
  max-width: 100%
  margin: 2vh 0
  flex-direction: row-reverse
  +phone
    flex-direction: column !important
  .title
    display: block
    font-size: 120%
    margin-bottom: 1em
  .view
    flex: 2
    position: relative
    overflow: hidden
    float: left
    max-height: 100vh
    min-height: 80vh
    margin: 20px
    +phone
      max-height: 60vh
</style>
