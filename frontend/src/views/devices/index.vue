<template>
  <div class="components-container">
    <div
      style="postion: relative; margin-left: 5px; float:left;"
      :style="{
        width: this.isShowLeft ? 'calc(100% - 700px)' : '100%',
        transition: this.isShowLeft ? '0.2s ease' : '0.6s ease',
      }"
    >
      <CommonFunction
        style="float: left; margin-left: 10px; text-align: left; width:100%;"
        :isShowADD="true"
        :isShowDELETE="true"
        @functionAddPage="showDialogDeices = true"
        @functionDeletePage="fn_delete"
      />
      <SingleDevice
        @click="fn_compoClick"
        style="margin: 10px;"
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      <el-dialog title="New Device" :visible.sync="showDialogDeices">
        <el-form class="login-form-log" autocomplete="on" label-position="left">
          <el-form-item prop="deviceName">
            <span style="margin-left:10px;font-size: large;"> Name</span>
            <el-input
              ref="deviceName"
              v-model="deviceForm.deviceName"
              style="color: black;"
              placeholder="Device Name"
              name="deviceName"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="description">
            <span style="margin-left:10px;font-size: large;">
              Description</span
            >
            <el-input
              ref="deviceType"
              v-model="deviceForm.deviceType"
              style="color: black;"
              placeholder="Device Description"
              name="deviceType"
              type="text"
              tabindex="2"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="label">
            <span style="margin-left:10px;font-size: large;"> Label</span>
            <el-input
              ref="deviceType"
              v-model="deviceForm.deviceLabel"
              style="color: black;"
              placeholder="Label"
              name="Label"
              type="text"
              tabindex="2"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="label">
            <el-checkbox
              label="Test Device"
              style="display:block; font-size: large;"
            >
            </el-checkbox>
          </el-form-item>
          <el-form-item prop="description">
            <span style="margin-left:10px;font-size: large;">
              Description</span
            >
            <el-input
              ref="deviceForm"
              v-model="deviceForm.deviceDescription"
              style="color: black;"
              placeholder="Description"
              name="deviceDescription"
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
            >Create Device</el-button
          >
        </el-form>
      </el-dialog>
    </div>
    <RightPanelExtra
      @leftPanelIsShow="leftPanelIsShow"
      @leftPanelIsHide="leftPanelIsHide"
    >
      <CommonFunction
        :isShowINIT="true"
        :isShowADD="true"
        :isShowDELETE="true"
        :isShowEdit="true"
        @functionAddPage="tableConfig[0].adding = true"
        @functionEditPage="tableConfig[0].updating = true"
        @functionImportPage="tableConfig[0].uploading = true"
        @functionInitPage="fn_init"
        @functionDeletePage="fn_delete"
        @functionExportPage="fn_export"
      />

      <div class="filter-container" style="float:left; width:100%">
        <!-- grid table -->
        <div
          style="postion: relative; margin-left: 5px; float:right; width:100%;"
        >
          <div class="label-title" style="min-height: 30px;">
            <el-col :span="12">
              <!-- <i class="icon el-icon-star-on" /> -->
              <!-- <FontResizableContainer tag="label" increment="4px" class="label">{{$t('LoadDispTitle')}}</FontResizableContainer> -->
            </el-col>
          </div>
          <UltimateTable
            :lockingPopup="tableConfig[0].lockingPopup"
            :progress="uploadProgress"
            :dataValue="ds_master"
            :dataModel="tableData"
            v-loading="tableConfig[0].loading"
            :rowKey="row => (row ? row._index : null)"
            :currentRowKey="selectedDevice._index"
            :commonCodes="ds_commonCode"
            :adding="tableConfig[0].adding"
            :updating="tableConfig[0].updating"
            :uploading="tableConfig[0].uploading"
            :paginationData="tableConfig[0]"
            :permission="
              ['INSERT', selectedDevice._index != -1 ? 'UPDATE' : ''].join('|')
            "
            :newItem="{
              _checked: false,
            }"
            @row-click="fn_rowClick"
            @stop-insert="tableConfig[0].adding = false"
            @stop-update="tableConfig[0].updating = false"
            @stop-upload="tableConfig[0].uploading = false"
            @on-insert="fn_add"
            @on-paging="fn_select"
          />
        </div>
        <!-- end grid table -->
      </div>
    </RightPanelExtra>
  </div>
</template>
<script>
import RightPanelExtra from '@/components/RightPanelExtra';
import SingleDevice from '@/components/SingleDevice';
import CommonFunction from '@/components/CommonFunction';
import FontResizableContainer from '@/components/FontResizableContainer';
import UltimateTable from '@/components/UltimateTable';
import { mapGetters } from 'vuex';

export default {
  name: 'Devices',
  components: {
    CommonFunction,
    UltimateTable,
    SingleDevice,
    RightPanelExtra,
  },
  data() {
    return {
      deviceForm: {
        deviceName: '',
        deviceType: '',
        deviceLabel: '',
        deviceDescription: '',
      },
      isShowLeft: true,
      showDialogDeices: false,
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
        { attr: 'Created', label: 'Created time', width: 250 },
        { attr: 'Name', label: 'Name', width: 250 },
        { attr: 'Device', label: 'Device type', width: 250 },
        { attr: 'Label', label: 'Label', width: 250 },
        { attr: 'Customer', label: 'Customer', width: 250 },
        { attr: 'Public', label: 'Public', width: 250 },
        { attr: 'Gateway', label: 'Is Gateway', width: 200 },
        { attr: 'addrId', permission: 'N' },
        { attr: '_index', permission: 'N' },
        { attr: '_checked', permission: 'N' },
      ],
      isShowLeft: false,
      multipleSelection: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      selectedDevice: { ...DEFAULT_ITEM },
      ds_master: [],
      ds_commonCode: {},
      selectedDeviceCd: null,
      uploadProgress: { ...DEFAULT_PROGRESS },
    };
  },
  mounted: function() {},
  computed: {
    ...mapGetters(['permission_routes']),
  },
  methods: {
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
      this.selectedDevice = { ...DEFAULT_ITEM };
      this.ds_master = [];
      this.ds_master2 = [];
      this.selectedDeviceCd = null;
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
        `[DEVICES]_[${date.getFullYear()}${date.getMonth() +
          1}${date.getDate()}]`,
      );
    },
    fn_rowClick: function(currentRow) {
      this.selectedDevice = currentRow;
    },
    fn_compoClick: function(currentRow) {
      alert('click');
    },
    fn_findRoute: function(command) {},
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
