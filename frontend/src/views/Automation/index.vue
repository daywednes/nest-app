<template>
  <div class="components-container">
    <div
      v-if="!showAutomationDetail"
      style="postion: relative; margin-left: 5px; float:left; width: 100%;"
    >
      <h1>Automations</h1>
      <el-input
        placeholder="Type something"
        prefix-icon="el-icon-search"
        v-model="textSearch"
      >
      </el-input>
      <div class="one-row">
        <div class="one-row-wrap">
          <el-button
            style="margin:0px;padding:0px; background: transparent;border: transparent;margin: 7px;"
            @click="
              () => {
                showDialogAutomations = true;
              }
            "
          >
            <el-card
              class="box-card"
              style=" width: 250px; float:left; min-height: 250px; display: inline-block; text-align-last: center;"
            >
              <div style="margin-top:40px;   white-space: break-spaces;">
                <h1>New Automation</h1>
                <br />
                <span style="font-size: xxx-large;"
                  ><i class="el-icon-plus"
                /></span>
              </div>
            </el-card>
          </el-button>
          <SingleAutomation
            @showDetail="fn_compoClick(automation)"
            style="margin: 15px; display: inline-block;"
            v-for="automation in automationsList"
            :key="automation.id"
            :item="automation"
          />
        </div>
      </div>
      <br />

      <h1>Alarm Modes</h1>
      <el-input
        placeholder="Type something"
        prefix-icon="el-icon-search"
        v-model="textSearchDeployed"
      >
      </el-input>
      <div class="one-row">
        <div class="one-row-wrap">
          <el-button
            style="margin:0px;padding:0px; background: transparent;border: transparent;margin: 7px;"
            @click="
              () => {
                showDialogAutomations = true;
              }
            "
          >
            <el-card
              class="box-card"
              style=" width: 250px; float:left; min-height: 250px; display: inline-block; text-align-last: center;"
            >
              <div style="margin-top:40px;   white-space: break-spaces;">
                <h1>New</h1>
                <h1>Alarm Mode</h1>
                <br />
                <span style="font-size: xxx-large;"
                  ><i class="el-icon-plus"
                /></span>
              </div>
            </el-card>
          </el-button>
          <SingleAutomation
            @click.native="fn_compoClick(automation)"
            style="margin: 15px; display: inline-block;"
            v-for="automation in automationsListDeployed"
            :key="automation.id"
            :item="automation"
          />
        </div>
      </div>
      <el-dialog title="New Automation" :visible.sync="showDialogAutomations">
        <el-form class="login-form-log" autocomplete="on" label-position="left">
          <el-form-item prop="AutomationName">
            <span style="margin-left:10px;font-size: large;"> Name</span>
            <el-input
              ref="AutomationName"
              v-model="AutomationForm.name"
              style="color: black;"
              placeholder="Automation Name"
              name="AutomationName"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="description">
            <span style="margin-left:10px;font-size: large;"> Description</span>
            <el-input
              ref="AutomationType"
              v-model="AutomationForm.description"
              style="color: black;"
              placeholder="Automation Description"
              name="AutomationType"
              type="text"
              tabindex="2"
              autocomplete="on"
            />
          </el-form-item>
          <el-button
            type="primary"
            style="width:100%;margin-bottom:10px;"
            @click="createAutomationEntity"
            >Create Automation</el-button
          >
        </el-form>
      </el-dialog>
    </div>
    <div v-if="showAutomationDetail">
      <el-button
        style="float:left;  margin-right: 20px"
        type="info"
        @click="
          () => {
            showAutomationDetail = false;
          }
        "
      >
        <i class="el-icon-back" />
      </el-button>
      <div style="float:left; width:70%">
        <h1>{{selectedAutomation.name}}</h1>
        <hr />
        <h2>{{selectedAutomation.description}} </h2>
      </div>
      <AutomationDetail :item="selectedAutomation"/>
    </div>
  </div>
</template>
<style scoped>
.el-select {
  width: 300px;
}

.one-row {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.one-row-wrap {
  display: inline-flex;
  white-space: nowrap;
}

.box-card {
  width: 600px;
  max-width: 100%;
  margin: 10px auto;
}
</style>
<script>
import SingleAutomation from '@/components/SingleAutomation';
import AutomationDetail from '@/views/retes/index';
import { mapGetters } from 'vuex';
import {
  getAutomations,
  createAutomation,
  deleteAutomation,
} from '@/api/automations';
import { getTags } from '@/api/tags';

export default {
  name: 'Automations',
  components: {
    SingleAutomation,
    AutomationDetail,
  },
  data() {
    return {
      textSearch: '',
      textSearchDeployed: '',
      AutomationForm: {
        name: '',
        description: '',
        orgId: '',
        status: 'CreatedAutomation',
        data: '',
      },
      showDialogAutomations: false,
      showAutomationDetail: false,
      editableTabsValue: '1',
      multipleSelection: [],
      optionsTag: [],
      automationsList: [],
      automationsListDeployed: [],
      automationsListTmp: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      ds_master: [],
      ds_commonCode: {},
      selectedAutomation: {
        name: '',
        AutomationType: '',
        AutomationLabel: '',
        description: '',
        tags: '',
        orgId: '',
        zoneId: '',
      },
      uploadProgress: { ...DEFAULT_PROGRESS },
    };
  },
  mounted: function() {
    this.getAutomationsList(this.orgId);
  },
  watch: {
    orgId(val, old) {
      this.AutomationForm.orgId = val;
      this.getAutomationsList(val);
    },
    textSearch(val, old) {
      this.searchAutomation(val);
    },
    textSearchDeployed(val, old) {
      this.searchAutomationDeployed(val);
    },
  },
  computed: {
    orgId() {
      if (this.$store.getters.orgId == null) {
        this.$alert('empty');
      }

      this.AutomationForm.orgId = this.$store.getters.orgId;
      return this.$store.getters.orgId;
    },
  },
  methods: {
    getTagsList() {
      getTags().then(response => {
        this.optionsTag = response;
      });
    },
    searchAutomation(txt) {
      if (txt && txt.length > 0) {
        this.automationsList = this.automationsListTmp.filter(
          automation =>
            automation.name
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()) ||
            automation.description
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()),
        );
      } else {
        this.automationsList = this.automationsListTmp;
      }
    },
    searchAutomationDeployed(txt) {
      if (txt && txt.length > 0) {
        this.automationsListDeployed = this.automationsListTmp.filter(
          automation =>
            automation.name
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()) ||
            automation.description
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()),
        );
      } else {
        this.automationsListDeployed = this.automationsListTmp;
      }
    },
    fn_compoClick: function(item) {
      this.selectedAutomation = item;
      this.showAutomationDetail = true;
    },
    fn_findRoute: function(command) {},
    createAutomationEntity() {
      if (!this.AutomationForm.orgId && this.AutomationForm.orgId.length < 1) {
        this.$alert('Please create Organization first');
      }

      if (!this.AutomationForm.name || this.AutomationForm.name.length < 1) {
        this.$alert('Please input name');
        return;
      }
      if (
        !this.AutomationForm.description ||
        this.AutomationForm.description.length < 1
      ) {
        this.$alert('Please input description');
        return;
      }
      const loadingAutomation = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      createAutomation(this.AutomationForm)
        .then(response => {
          this.refreshUI();
        })
        .finally(() => {
          loadingAutomation.close();
        });
    },
    getAutomationsList(val) {
      getAutomations(val).then(response => {
        response.forEach(row => {
          row.zoneId = row.zone ? row.zone.id : null;
          row.orgId = row.org ? row.org.id : null;
        });

        this.automationsListTmp = response;
        this.automationsList = this.automationsListTmp;
        this.automationsListDeployed = this.automationsListTmp;

        // this.$store.dispatch('user/updateAutomations', response);
      });
    },
    refreshUI() {
      this.AutomationForm.name = '';
      this.textSearch = '';
      this.textSearchDeployed = '';
      this.AutomationForm.description = '';
      this.getAutomationsList(this.orgId);
      this.isShowLeft = false;
      this.showDialogAutomations = false;
    },
  },
};
const DEFAULT_SEARCH_QUERY = {
  ctKey: null,
  logGrpCd: null,
  loadId: null,
  loadDesc: null,
  equipTyp: null,
  strdDate: null,
  customerId: null,
  carrierId: null,
  COMMON_PARAM: {
    startIndex: 0,
    pageSize: 100,
    sortConditions: [],
    orCondition: false,
  },
};
const DEFAULT_ITEM = {
  orgId: -1,
  zoneId: -1,
  _index: -1,
  _checked: false,
};
const DEFAULT_PROGRESS = {
  showed: false,
  percent: 0,
  message: '',
};
</script>
