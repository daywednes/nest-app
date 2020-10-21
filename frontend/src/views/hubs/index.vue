<template>
  <div class="app-container">
    <el-tabs v-model="editableTabsValue" style="width:95%; position: absolute;">
      <el-tab-pane
        v-for="(item, index) in zonesList"
        :key="index"
        :label="item.name"
        :name="item.name"
      >
        <keep-alive>
          <Zones />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <div style=" position: absolute;">
      <el-input
        placeholder="Type something"
        prefix-icon="el-icon-search"
        style="width: 60%; margin-right: 10px;"
        v-model="textSearch"
      >
      </el-input>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="addTab(editableTabsValue)"
      >
        Add Hub
      </el-button>
    </div>
  </div>
</template>

<style>
.el-tabs__nav-scroll {
  float: right;
}
</style>
<style scoped>

.el-select {
  width: 300px;
}
</style>
<script>
import RightPanelExtra from '@/components/RightPanelExtra';
import DevicesOfZoneHub from '@/views/hubs/DevicesOfZoneHub';
import ZoneHubDetails from '@/views/hubs/ZoneHubDetails';
import SingleZone from '@/components/SingleZone';
import CommonFunction from '@/components/CommonFunction';
import FontResizableContainer from '@/components/FontResizableContainer';
import UltimateTable from '@/components/UltimateTable';
import Zones from '@/views/zones/index';
import { mapGetters } from 'vuex';
import { getZones, createZone, deleteZone } from '@/api/zone';

export default {
  name: 'Hubs',
  components: {
    CommonFunction,
    UltimateTable,
    SingleZone,
    RightPanelExtra,
    ZoneHubDetails,
    DevicesOfZoneHub,
    Zones,
  },
  data() {
    return {
      editableTabsValue: '',
      textSearch: '',
      ZoneForm: {
        name: '',
        ZoneType: '',
        ZoneLabel: '',
        description: '',
        orgId: '',
      },
      showDialogZones: false,
      editableTabsValue: '1',
      isShowLeft: false,
      tableConfig: [
        {
          adding: false,
          updating: false,
          uploading: false,
          loading: false,
          lockingPopup: false,
          total: 0,
          page: 1,
          limit: 20,
        },
      ],
      tableData: [
        {
          attr: 'Created',
          label: 'Created time',
          permission: 'READ',
          width: 250,
        },
        { attr: 'Name', label: 'Name', width: 250 },
        { attr: 'Asset', label: 'Asset type', width: 250 },
        { attr: 'Label', label: 'Label', width: 250 },
        { attr: 'Customer', label: 'Customer', width: 250 },
        { attr: 'Public', label: 'Public', width: 250 },
        { attr: 'addrId', permission: 'N' },
        { attr: '_index', permission: 'N' },
        { attr: '_checked', permission: 'N' },
      ],
      multipleSelection: [],
      zonesList: [],
      zonesListTmp: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      selectedZone: { ...DEFAULT_ITEM },
      ds_master: [],
      ds_commonCode: {},
      selectedZone: {
        name: '',
        ZoneType: '',
        ZoneLabel: '',
        description: '',
        orgId: '',
      },
      uploadProgress: { ...DEFAULT_PROGRESS },
    };
  },
  mounted: function() {
    this.getZonesList(this.orgId);
  },
  watch: {
    orgId(val, old) {
      this.ZoneForm.orgId = val;
      this.getZonesList(val);
    },
    textSearch(val, old) {
      this.searchZone(val);
    },
  },
  computed: {
    orgId() {
      if (this.$store.getters.orgId == null) {
        this.$alert('empty');
      }

      this.ZoneForm.orgId = this.$store.getters.orgId;
      return this.$store.getters.orgId;
    },
  },
  methods: {
    addTab(targetName) {
      console.log(targetName);
      let newTabName = targetName + '1';
      this.zonesList.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      this.editableTabsValue = newTabName;
    },
    searchZone(txt) {
      if (txt && txt.length > 0) {
        this.zonesList = this.zonesListTmp.filter(
          zone =>
            zone.name
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()) ||
            zone.description
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()),
        );
      } else {
        this.zonesList = this.zonesListTmp;
      }
    },
    leftPanelIsShow: function() {
      this.isShowLeft = true;
    },
    leftPanelIsHide: function() {
      this.isShowLeft = false;
    },
    checkDuplicate: function(row) {
      // NetworkService.NETWORK.validateZoneCode(row.zoneCd).then(res => {
      //   if (!isGtoResponseSuccess(res)) {
      //     return false;
      //   }
      //   row._checked = true;
      //   return true;
      // });
      return true;
    },
    fn_select: function() {},
    fn_init: function() {
      this.uploadProgress = { ...DEFAULT_PROGRESS };
      this.multipleSelection = [];
      this.queryCondition = { ...DEFAULT_SEARCH_QUERY };
      this.ds_master = [];
      this.ds_master2 = [];
      this.selectedZone = null;
      this.tableConfig = [
        {
          adding: false,
          updating: false,
          uploading: false,
          loading: false,
          total: 0,
          page: 1,
          limit: 20,
        },
        { adding: false, updating: false, loading: false },
      ];
    },
    fn_add: function(item) {
      // item.isCreate = true;
      // this.tableConfig[0].lockingPopup = true;
      // NetworkService.NETWORK.createShippingLocation(item).then(res => {
      //   this.tableConfig[0].lockingPopup = false;
      //   if (!isGtoResponseSuccess(res)) {
      //     return;
      //   }
      //   this.fn_select();
      //   this.tableConfig[0].adding = false;
      // });
    },
    fn_delete: function() {},
    fn_export: function() {
      let date = new Date();
      exportByDataModel(
        this.ds_master,
        this.tableData,
        `[ZoneS]_[${date.getFullYear()}${date.getMonth() +
          1}${date.getDate()}]`,
      );
    },
    fn_rowClick: function(currentRow) {
      this.selectedZone = currentRow;
    },
    fn_compoClick: function(item) {
      this.selectedZone = item;
      this.isShowLeft = true;
    },
    fn_findRoute: function(command) {},
    createZoneEntity() {
      if (!this.ZoneForm.orgId && this.ZoneForm.orgId.length < 1) {
        this.$alert('Please create Organization first');
      }
      if (!this.ZoneForm.name || this.ZoneForm.name.length < 1) {
        this.$alert('Please input name');
        return;
      }
      if (!this.ZoneForm.description || this.ZoneForm.description.length < 1) {
        this.$alert('Please input description');
        return;
      }
      createZone(this.ZoneForm).then(response => {
        this.refreshUI();
      });
    },
    getZonesList(val) {
      getZones(val).then(response => {
        this.zonesListTmp = response;
        this.zonesList = this.zonesListTmp;
        this.editableTabsValue = this.zonesList[0].name;
        this.$store.dispatch('user/updateZones', response);
      });
    },
    refreshUI() {
      this.ZoneForm.name = '';
      this.ZoneForm.description = '';
      this.textSearch = '';
      this.getZonesList(this.orgId);
      this.isShowLeft = false;
      this.showDialogZones = false;
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
  _index: -1,
  _checked: false,
};
const DEFAULT_PROGRESS = {
  showed: false,
  percent: 0,
  message: '',
};
</script>
