<template>
  <div
    style="float: left; align-self: center; display:inherit; padding-left: 20px; width: 300px;"
  >
    <!-- <label style="display: table;width: 80px;">{{ $t("DBSEL") }}</label> -->
    <el-select
      v-model="organizationCode"
      style="align-self: center; text-align-last: left;inline-size: fit-content;margin: 0 30px 0 10px;"
      @change="updateOrgID(organizationCode)"
    >
      <el-option
        style="align-self: center; text-align-last: left;"
        v-for="item in orgList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
        <el-button
          style="float: left; 
            margin: 3px; 
            background: transparent;"
          class="show-icon"
          @click="fn_delete(item.id)"
        >
          <i class="el-icon-close" />
        </el-button>
        {{ item.name }}</el-option
      >
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
            v-model="organizationForm.name"
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
            v-model="organizationForm.description"
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
        <el-button
          type="primary"
          style="width:100%;margin-bottom:10px;"
          @click="createOrganization"
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
import { getOrgs, createOrg, deleteOrg } from '@/api/org';
export default {
  data() {
    return {
      organizationCode: '',
      orgList: [],
      showDialog: false,
      organizationForm: {
        name: '',
        description: '',
      },
    };
  },

  created() {
    this.getOrgList();
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
    fn_delete(id) {
      // alert('Delete'+ tmp)
      // return;

      deleteOrg(id).then(response => {
        this.organizationCode = '';
        this.$store.dispatch('user/updateOrgID', this.organizationCode);
        this.getOrgList();
      });
    },
    getOrgList() {
      getOrgs().then(response => {
        this.orgList = response;
        if (
          this.orgList &&
          this.orgList.length > 0 &&
          this.organizationCode.length == 0
        ) {
          this.organizationCode = this.orgList[0].id;
          this.$store.dispatch('user/updateOrgID', this.organizationCode);
        }
      });
    },
    updateOrgID(id) {
      this.$store.dispatch('user/updateOrgID', id);
    },
    createOrganization() {
      if (
        !this.organizationForm.name ||
        this.organizationForm.name.length < 1
      ) {
        alert('Please input name');
        return;
      }
      if (
        !this.organizationForm.description ||
        this.organizationForm.description.length < 1
      ) {
        alert('Please input description');
        return;
      }
      createOrg(this.organizationForm).then(response => {
        this.getOrgList();
        this.showDialog = false;
      });
    },
  },
};
</script>
