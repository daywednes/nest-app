<template>
  <el-card class="box-card" style=" width: 300px; float:left;">
    <div slot="header" class="clearfix">
      <svg-icon icon-class="international" />
      <span style="margin-left:10px;font-size: x-large;">TITTLE</span>
    </div>
    <div>
      <el-checkbox  label="Test Device" style="margin:10px 0px 30px 0px;display:block; font-size: x-large;">
        
      </el-checkbox>
      <el-button type="primary" icon="el-icon-share"> </el-button>
      <el-button type="primary" icon="el-icon-s-custom"> </el-button>
      <el-button type="primary" icon="el-icon-s-data"> </el-button>
      <el-button type="primary" icon="el-icon-delete-solid"> </el-button>
      <el-tag style="margin-top:15px;display:block;" type="info">
        note
      </el-tag>
    </div>
  </el-card>
</template>
<style scoped>
.box-card {
  width: 600px;
  max-width: 100%;
  margin: 20px auto;
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
