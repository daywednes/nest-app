<template>
  <div class="app-container" style=" background-color: rgb(240, 242, 245);">
    <el-row
      style="background:#fff;padding:10px 10px;margin:10px; text-align:left;"
      ><el-input
        placeholder="Search"
        prefix-icon="el-icon-search"
        style="width: 30%; margin-right: 10px;"
        v-model="textSearch"
      >
      </el-input>
    </el-row>
    <el-row style="background:#fff;padding:30px;margin:10px; text-align:left;">
      <h1>All Activity For {{ orgName }}</h1>
      <hr />
      <br />
      <el-col :span="12">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) of timeline"
            :key="index"
            :timestamp="item.timestamp"
            placement="top"
          >
            <el-card>
              <el-row>
                <el-col :xs="4" :sm="4" :lg="4">
                  <img
                    v-if="logo"
                    :src="logo"
                    style="float: left; height: 50px;"
                  />
                </el-col>
                <el-col :xs="8" :sm="16" :lg="16">
                  {{ item.title }}
                  <br />
                  {{ item.content }}
                </el-col>
                <el-col :xs="4" :sm="4" :lg="4">
                  {{ item.timestamp }}
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="12">
        <el-row style="margin :20px; font-size: medium;">
          <span class="demonstration"
            >Select a date to view or click and drag for a date range
          </span>
          <br />
          <el-date-picker
            v-model="daterange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-row>
        <el-row style="margin :20px; font-size: medium;">
          <span class="demonstration">Filter by Hub </span>
          <br />
          <el-select
            v-model="valueHub"
            clearable
            filterable
            placeholder="All Hubs"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
        <el-row style="margin :20px; font-size: medium;">
          <span class="demonstration">Filter by Zone Interface </span>
          <br />
          <el-select
            v-model="valueZone"
            clearable
            filterable
            placeholder="All Zone Interface"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
export default {
  name: 'Activity',
  computed: {
    orgName() {
      if (this.$store.getters.orgId == null) {
        this.$alert('empty');
      }
      let orgId = this.$store.getters.orgId;
      let orgs = this.$store.getters.orgs;
      return orgs.find(x => x.id == orgId).name;
    },
  },
  data() {
    return {
      logo: logoSimpleThings,
      daterange: null,
      timeline: [
        {
          timestamp: '2019/4/20',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2019/4/20 20:46',
        },
        {
          timestamp: '2019/4/21',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2019/4/21 20:46',
        },
        {
          timestamp: '2019/4/22',
          title: 'Build Template',
          content: 'PanJiaChen committed 2019/4/22 20:46',
        },
        {
          timestamp: '2019/4/23',
          title: 'Release New Version',
          content: 'PanJiaChen committed 2019/4/23 20:46',
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      valueHub: '',
      valueZone: '',
      textSearch: '',
    };
  },
};
</script>
