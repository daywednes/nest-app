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
      <span style="margin-left:10px;font-size: large;">{{ item.name }} </span>

      <!-- <el-checkbox  :label="item.name" style="font-size: xx-large;">
        
      </el-checkbox> -->
    </div>
    <div>
      <!-- <el-checkbox  label="Test Zone" style="margin:10px 0px 30px 0px;display:block; font-size: x-large;">
        
      </el-checkbox> -->
      <span style="margin:10px 0px 10px 0px;display:block; font-size: large;">ID: {{
        item.id
      }}</span>
      <span style="margin:10px 0px 10px 0px;display:block; font-size: large;">Description: {{
        item.description
      }}</span>
      <!-- <el-button type="primary" icon="el-icon-share"> </el-button>
      <el-button type="primary" icon="el-icon-s-custom"> </el-button>
      <el-button type="primary" icon="el-icon-s-data"> </el-button>
      <el-button type="primary" icon="el-icon-delete-solid"> </el-button> -->
      <!-- <span
        style="margin:10px 0px 5px 0px;display:block; font-size: medium;
    font-weight: bold;"
        >TAGS :
      </span>
      <el-tag
        v-for="tag in item.tags"
        :key="tag"
        style="margin:10px 10px 5px 0px;"
        type="info"
      >
        {{ tag }}
      </el-tag> -->
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
export default {
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
