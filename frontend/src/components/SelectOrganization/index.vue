<template>
  <div
    style="float: left; align-self: center; display:inherit; padding-left: 20px; width: 300px;"
  >
    <el-dropdown
      class="el-dropdown-box"
      trigger="click"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        Organization Name: {{ organization.name
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled>Manage Organizations</el-dropdown-item>
        <el-dropdown-item command="switchOrg"
          >Switch Organization</el-dropdown-item
        >
        <el-dropdown-item command="addOrg"
          >Add A New Organization</el-dropdown-item
        >
        <el-dropdown-item command="editOrg"
          >Edit This Organization</el-dropdown-item
        >
        <el-dropdown-item disabled divided>Manage Hubs</el-dropdown-item>
        <el-dropdown-item command="addHub">Add A New Hub</el-dropdown-item>
        <el-dropdown-item command="editHub">Edit Hubs</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  <!-- Edit Organization -->
    <el-dialog title="Edit Organization" :visible.sync="showEditDialog">
      <el-form class="login-form-log" autocomplete="on" label-position="left">
        <el-form-item prop="orgName">
          <span style="margin-left:10px;font-size: x-large;"> Name</span>
          <el-input
            ref="orgName"
            v-model="organization.name"
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
            v-model="organization.description"
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
          @click="editOrganization"
          >Edit Organization</el-button
        >
      </el-form>
    </el-dialog>

    <!-- Add Organization -->
    <el-dialog title="New Organization" :visible.sync="showAddDialog">
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
        <el-button
          type="primary"
          style="width:100%;margin-bottom:10px;"
          @click="createOrganization"
          >Create Organization</el-button
        >
      </el-form>
    </el-dialog>

    <!-- Add Hub -->
    <el-dialog title="New Hub" :visible.sync="showAddHUBDialog">
      <el-form class="login-form-log" autocomplete="on" label-position="left">
        <el-form-item prop="hubName">
          <span style="margin-left:10px;font-size: x-large;"> Name</span>
          <el-input
            ref="hubName"
            v-model="hubForm.name"
            style="color: black;"
            placeholder="Hub Name"
            name="hubName"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="description">
          <span style="margin-left:10px;font-size: x-large;"> Description</span>
          <el-input
            ref="hubDescription"
            v-model="hubForm.description"
            style="color: black;"
            placeholder="Hub Description"
            name="hubDescription"
            type="textarea"
            tabindex="2"
            :rows="3"
            autocomplete="on"
          />
        </el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:10px;"
          @click="createHub"
          >Create Hub</el-button
        >
      </el-form>
    </el-dialog>

    <!-- Switch Organization -->
    <el-dialog title="Switch Organization" :visible.sync="showSwitchDialog">
      <el-select
        v-model="organization.code"
        style="align-self: center; text-align-last: left;inline-size: fit-content;margin: 0 30px 0 10px;"
        @change="updateOrgID(organization.code)"
      >
        <el-option
          style="align-self: center; text-align-last: left;"
          v-for="item in orgList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <!-- <el-button
            style="float: left; 
            margin: 3px; 
            background: transparent;"
            class="show-icon"
            @click="fn_delete(item.id)"
          >
            <i class="el-icon-close" />
          </el-button> -->
          {{ item.name }}</el-option
        >
      </el-select>
    </el-dialog>
  </div>
</template>
<style scoped>
/* .el-dropdown el-dropdown-item{
  text-transform: uppercase;
}
.el-dropdown-item{
  text-transform: uppercase;
} */
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
.el-dropdown-link {
  padding: 5px;
  cursor: pointer;
  border: 2px black;
  width: 300px;
  /* color: #409EFF; */
}
.el-dropdown-box {
  border: 1px solid black;
  float: right;
  margin: 5px;
  line-height: 38px;
  vertical-align: middle;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
import { getOrgs, createOrg, deleteOrg, updateOrg } from '@/api/org';
import { getHubs, createHub, deleteHub } from '@/api/hubs';
export default {
  data() {
    return {
      organization:{},
      organization:{},
      orgList: [],
      showAddDialog: false,
      showAddHUBDialog: false,
      showSwitchDialog: false,
      showEditDialog: false,
      showEditHUBDialog: false,
      organizationForm: {
        name: '',
        description: '',
      },
      hubForm: {
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
    handleCommand(command) {
      switch (command) {
        case 'addOrg':
          this.showAddDialog = true;
          break;
        case 'addHub':
          this.showAddHUBDialog = true;
          break;
        case 'switchOrg':
          this.showSwitchDialog = true;
          break;
        case 'editOrg':
          this.showEditDialog = true;
          break;
        case 'editHub':
          this.showEditHUBDialog = true;
          break;
      }
    },
    fn_delete(id) {
      // this.$alert('Delete'+ tmp)
      // return;
      if (this.orgList.length < 2) {
        this.$alert('This is the last organization.');
        return;
      }
      deleteOrg(id).then(response => {

        this.organization={};
        // this.organization.code = '';
        // this.organization.name = '';
        this.$store.dispatch('user/updateOrgID', '');
        this.getOrgList();
      });
    },
    getOrgList() {
      getOrgs().then(response => {
        this.orgList = response;
        if (
          this.orgList &&
          this.orgList.length > 0 &&
          (! this.organization || this.organization)
        ) {
          this.organization =  this.orgList[0];
          // this.organization.code = this.orgList[0].id;
          // this.organization.name = this.orgList[0].name;
          this.$store.dispatch('user/updateOrgID', this.organization.code);
        }
        this.$store.dispatch('user/updateOrgs', response);
      });
    },
    updateOrgID(id) {
      this.organization = this.orgList.find(x => x.id == id);
      this.$store.dispatch('user/updateOrgID', id);

      this.showSwitchDialog = false;
    },
    createHub() {
      if (
        !this.hubForm.name ||
        this.hubForm.name.length < 1
      ) {
        this.$alert('Please input name');
        return;
      }
      if (
        !this.hubForm.description ||
        this.hubForm.description.length < 1
      ) {
        this.$alert('Please input description');
        return;
      }
      createHub(this.hubForm).then(response => {
        this.getOrgList();
        this.showAddHUBDialog = false;
      });
    },
    createOrganization() {
      if (
        !this.organizationForm.name ||
        this.organizationForm.name.length < 1
      ) {
        this.$alert('Please input name');
        return;
      }
      if (
        !this.organizationForm.description ||
        this.organizationForm.description.length < 1
      ) {
        this.$alert('Please input description');
        return;
      }
      createOrg(this.organizationForm).then(response => {
        this.getOrgList();
        this.showAddDialog = false;
      });
    },
    editOrganization() {
      if (
        !this.organization.name ||
        this.organization.name.length < 1
      ) {
        this.$alert('Please input name');
        return;
      }
      if (
        !this.organization.description ||
        this.organization.description.length < 1
      ) {
        this.$alert('Please input description');
        return;
      }
      updateOrg(this.organization).then(response => {
        this.getOrgList();
        this.showEditDialog = false;
      });
    },
  },
};
</script>
