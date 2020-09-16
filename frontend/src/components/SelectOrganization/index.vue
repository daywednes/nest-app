<template>
  <div
    style="float: left; align-self: center; display:inherit; padding-left: 20px; width: 300px;"
  >
    <!-- <label style="display: table;width: 80px;">{{ $t("DBSEL") }}</label> -->
    <el-select
      v-model="organizationCode"
      style="align-self: center; text-align-last: left;inline-size: fit-content;margin: 0 30px 0 10px;"
    >
      <el-option
        style="align-self: center; text-align-last: left;"
        value="1"
        label="Organization 1"
      >
        <el-button
          style="float: left; 
            margin: 3px; 
            background: transparent;"
          class="show-icon"
          @click="fn_delete"
        >
          <i class="el-icon-close" /> </el-button
        >Organization 1 </el-option
      ><el-option
        style="align-self: center; text-align-last: left;"
        value="2"
        label="Organization 2"
      >
        <el-button
          style="float: left; 
            margin: 3px; 
            background: transparent;"
          class="show-icon"
          @click="fn_delete"
        >
          <i class="el-icon-close" /> </el-button
        >Organization 2
      </el-option>
      <el-option
        style="align-self: center; text-align-last: left;"
        value="3"
        label="Organization 3"
      >
        <el-button
          style="float: left; 
            margin: 3px; 
            background: transparent;"
          class="show-icon"
          @click="fn_delete"
        >
          <i class="el-icon-close" /> </el-button
        >Organization 3
      </el-option>
      <el-option
        style="align-self: center; text-align-last: left;"
        value="CreateDB"
        label="Create Owner DB"
        disabled
      >
        <el-button
          style="float: left; margin: 5px; width: 100%; "
          class="show-icon"
          @click="showDialog = true"
        >
          <i class="el-icon-plus" /> Create Organization
        </el-button>
      </el-option>
    </el-select>
    <el-dialog title="New Organization" :visible.sync="showDialog">
      <el-form class="login-form-log" autocomplete="on" label-position="left">
        <el-form-item prop="orgName">
          <span style="margin-left:10px;font-size: x-large;"> Name</span>
          <el-input
            ref="orgName"
            v-model="organizationForm.orgName"
            style="color: black;"
            placeholder="Organization Name"
            name="orgName"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="description">
          <span style="margin-left:10px;font-size: x-large;"> Description</span>
          <el-input
            ref="orgDescription"
            v-model="organizationForm.orgDescription"
            style="color: black;"
            placeholder="Organization Description"
            name="orgDescription"
            type="textarea"
            tabindex="2"
            :rows="3"
            autocomplete="on"
          />
        </el-form-item>

        <!-- <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
        </el-tooltip> -->
        <el-button type="primary" style="width:100%;margin-bottom:10px;"
          >Create Organization</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>
<style scoped>
.el-button {
  padding: 10px;
  border: 0px;
}
.el-select-dropdown__item {
  padding: 0px;
  margin: 5px;
  height: 40px;
  line-height: 40px;
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
  data() {
    return {
      organizationCode: '1',
      showDialog: false,
      organizationForm: {
        orgName: '',
        orgDescription: '',
      },
    };
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
    fn_delete(tmp) {
      alert('Delete'+ tmp)
      return;
      
    },
  },
};
</script>
