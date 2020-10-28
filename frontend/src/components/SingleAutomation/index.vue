<template>
  <el-card
    class="box-card"
    style=" width: 250px; float:left; min-height: 150px;"
  >
    <div slot="header" class="clearfix">
      <svg-icon
        style="margin-left:10px;font-size: large;"
        icon-class="example"
      />
      <span style="margin-left:10px;font-size: medium;">{{ item.name }} </span>
    </div>
    <div>
      <span style="margin:0px 0px 10px 0px;display:block; font-size: medium;"
        >Description: {{ item.description }}</span
      >
      <span style="margin:10px 0px 10px 0px;display:block; font-size: medium;"
        >Last Time Update: {{ item.lastTimeUpdate }}</span
      >
    </div>
  </el-card>
</template>
<style scoped>
.box-card {
  width: 600px;
  max-width: 100%;
  margin: 5px auto;
}
.item-btn {
  margin-bottom: 15px;
  margin-left: 0px;
}
.block {
  padding: 25px;
}
</style>
<script>
import { getTags, getTagsById } from '@/api/tags';
export default {
  data() {
    return {
      itemTags: [],
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    language() {
      if (this.$store.getters.language == null) {
        this.handleSetLanguage('ENG');
      }
      return this.$store.getters.language;
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch('app/setLanguage', lang);
      this.$message({
        message: 'Switch Language Success',
        type: 'success',
      });
    },
  },
};
</script>
