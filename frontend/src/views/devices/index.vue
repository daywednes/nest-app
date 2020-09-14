<template>
  <div class="components-container">
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
          :rowKey="row => row ? row._index : null"
          :currentRowKey="selectedDevice._index"
          :commonCodes="ds_commonCode"
          :adding="tableConfig[0].adding"
          :updating="tableConfig[0].updating"
          :uploading="tableConfig[0].uploading"
          :paginationData="tableConfig[0]"
          :permission="['INSERT', selectedDevice._index != -1 ? 'UPDATE' : ''].join('|')"
          :newItem="{
            _checked: false
          }"
          @row-click="fn_rowClick"
          @stop-insert="tableConfig[0].adding = false"
          @stop-update="tableConfig[0].updating = false"
          @stop-upload="tableConfig[0].uploading = false"
          @on-insert="fn_add"
          @on-update="fn_updateRoute"
          @on-paging="fn_select"
        />
      </div>
      <!-- end grid table -->
    </div>
  </div>
</template>
<script>
import CommonFunction from "@/components/CommonFunction";
import FontResizableContainer from "@/components/FontResizableContainer";
import UltimateTable from "@/components/UltimateTable";

export default {
  name: "Devices",
  components: {
    CommonFunction,
    UltimateTable
  },
  data() {
    return {
      tableConfig: [
        {
          adding: false,
          updating: false,
          uploading: false,
          loading: false,
          lockingPopup: false,
          total: 0,
          page: 1,
          limit: 20
        }
      ],
      tableData: [
        { attr: "Created", label: "Created time", width: 250 },
        { attr: "Name", label: "Name", width: 250 },
        { attr: "Device", label: "Device type", width: 250 },
        { attr: "Label", label: "Label", width: 250 },
        { attr: "Customer", label: "Customer", width: 250 },
        { attr: "Public", label: "Public", width: 250 },
        { attr: "Gateway", label: "Is Gateway", width: 200 },
        { attr: "addrId", permission: "N" },
        { attr: "_index", permission: "N" },
        { attr: "_checked", permission: "N" }
      ],
      isShowLeft: true,
      multipleSelection: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      selectedDevice: { ...DEFAULT_ITEM },
      ds_master: [],
      ds_commonCode: {},
      selectedDeviceCd: null,
      uploadProgress: { ...DEFAULT_PROGRESS }
    };
  },
  mounted: function() {
  },
  methods: {
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
    fn_select: function() {
      
    },
    fn_init: function() {
      this.uploadProgress= { ...DEFAULT_PROGRESS };
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
          limit: 20
        },
        { adding: false, updating: false, loading: false }
      ];
    },
    fn_add: function(item) {
      item.isCreate = true;
      this.tableConfig[0].lockingPopup = true
      NetworkService.NETWORK.createShippingLocation(item).then(res => {
        this.tableConfig[0].lockingPopup = false
        if (!isGtoResponseSuccess(res)) {
          return;
        }
        this.fn_select();
        this.tableConfig[0].adding = false;
      });
    },
    fn_updateRoute: function(item) {
      this.tableConfig[0].lockingPopup = true
      NetworkService.NETWORK.updateFindRoute(item).then(res => {
        this.tableConfig[0].lockingPopup = false
        if (!isGtoResponseSuccess(res)) {
          return;
        }
        this.fn_select();
        this.tableConfig[0].updating = false;
      });
    },
    fn_delete: function() {
    },
    fn_export: function() {
      let date = new Date()
      exportByDataModel(this.ds_master, 
        this.tableData, 
        `[DEVICES]_[${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}]`)
    },
    fn_rowClick: function(currentRow) {
      this.selectedDevice = currentRow;
    },
    fn_findRoute: function(command) {

    }
  }
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
    orCondition: false
  }
};
const DEFAULT_ITEM = {
  _index: -1,
  _checked: false
};
const DEFAULT_PROGRESS = {
  showed: false,
  percent: 0,
  message: ""
};
</script>
