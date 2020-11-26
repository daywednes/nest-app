<template>
  <el-card
    class="box-card"
    style=" width: 250px; float:left; min-height: 150px;"
    :style="{
      background: this.status ? 'white' : '#ffa9a9',
    }"
  >
    <div slot="header" class="clearfix">
      <svg-icon
        style="margin-left:10px;font-size: large;"
        icon-class="example"
      />
      <span style="margin-left:10px;font-size: medium;">{{ item.name }} </span>

      <!-- <el-checkbox  :label="item.name" style="font-size: xx-large;">
        
      </el-checkbox> -->
    </div>
    <div v-if="status" style="  white-space: break-spaces;">
      <!-- <el-checkbox  label="Test Zone" style="margin:10px 0px 30px 0px;display:block; font-size: x-large;">
        
      </el-checkbox> -->
      <!-- <span style="margin:10px 0px 10px 0px;display:block; font-size: medium;"
        >ID: {{ item.id }}</span
      >
      <span style="margin:10px 0px 10px 0px;display:block; font-size: medium;"
        >Description: {{ item.description }}</span
      > -->
      <span style="margin:0px 0px 10px 0px;display:block; font-size: medium;"
        >Location: {{ item.location }}</span
      >
      <span style="margin:10px 0px 10px 0px;display:block; font-size: medium;"
        >Location Type: {{ item.locationType }}</span
      >
      <!-- <el-button type="primary" icon="el-icon-share"> </el-button>
      <el-button type="primary" icon="el-icon-s-custom"> </el-button>
      <el-button type="primary" icon="el-icon-s-data"> </el-button>
      <el-button type="primary" icon="el-icon-delete-solid"> </el-button> -->

      <div style=" min-height: 60px;">
        <span
          style="margin:10px 0px 5px 0px;display:block; font-size: small;float: left;
    font-weight: bold;"
          >TAGS :
        </span>
        <el-tag
          v-for="tag in itemTags"
          :key="tag"
          style="margin:5px 5px 5px 0px; float: left;"
          type="info"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>
    <div v-if="!status" style="font-size:x-large;  white-space: break-spaces;">
      
      <svg-icon
        style="margin:0px 10px;font-size: xx-large;"
        icon-class="lock"
      />Click Setup
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
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  watch: {
    item(val, old) {
      this.getTagsDeviceList();
    },
  },
  mounted: function() {
    this.getTagsDeviceList();
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

    getTagsDeviceList() {
      getTagsById(this.item.id).then(response => {
        this.itemTags = response.map(x => x.name)
          ? response.map(x => x.name)
          : [];
      });
    },
  },
};
</script>
