import store from '../store';
import _Vue from 'vue';
import nestutils from '@/utils/nest-utils';

const DEFAULT_WIDGETS_LIST = [
  {
    i: 'Zone Input',
    component: 'DISARMED',
    isDefine: false,
    isStatic: true,
    isActive: true,
    id: 31,
    availableDevices: 0,
    name: 'Zone Input',
    deviceGroup: nestutils.DeviceGroup.Zone_Input,
    description: 'Zone Input',
    location: 'Zone Input',
    locationType: '3',
    updated: '2020-11-19T15:07:39.271Z',
  },
  {
    i: 'Zone Output',
    component: 'DISARMED',
    isStatic: true,
    isDefine: false,
    id: 22,
    availableDevices: 0,
    isActive: false,
    name: 'Zone Output',
    deviceGroup: nestutils.DeviceGroup.Zone_Output,
    description: 'Zone Output',
    location: 'Zone Output',
    locationType: '3',
    updated: '2020-11-19T15:07:39.271Z',
  },
  {
    i: 'Contact Sensor',
    component: 'DISARMED',
    id: 53,
    availableDevices: 0,
    isActive: true,
    isDefine: false,
    name: 'Contact Sensor',
    deviceGroup: nestutils.DeviceGroup.Contact_Sensor,
    description: 'Contact Sensor',
    location: 'Contact Sensor',
    locationType: '3',
    updated: '2020-11-19T15:07:39.271Z',
  },
  {
    i: 'Motion Sensor',
    component: 'DISARMED',
    isStatic: true,
    id: 44,
    availableDevices: 0,
    isActive: true,
    isDefine: false,
    name: 'Motion Sensor',
    deviceGroup: nestutils.DeviceGroup.Motion_Sensor,
    description: 'Motion Sensor',
    location: 'Motion Sensor',
    locationType: '3',
    updated: '2020-11-19T15:07:39.271Z',
  },
  {
    i: 'Radar Sensor',
    component: 'DISARMED',
    isStatic: true,
    isActive: false,
    isDefine: false,
    id: 35,
    availableDevices: 0,
    name: 'Radar Sensor',
    deviceGroup: nestutils.DeviceGroup.Radar_Sensor,
    description: 'Radar Sensor',
    location: 'Radar Sensor',
    locationType: '3',
    updated: '2020-11-19T15:07:39.271Z',
  },
  {
    i: 'Camera',
    component: 'DISARMED',
    isStatic: true,
    isActive: false,
    isDefine: false,
    id: 25,
    availableDevices: 0,
    name: 'Camera',
    deviceGroup: nestutils.DeviceGroup.Camera,
    description: 'Camera',
    location: 'Camera',
    locationType: '3',
    updated: '2020-11-19T15:07:39.271Z',
  },
];
const DEFAULT_ZONE_LIST = [
  {
    id: 37,
    name: 'Zone Hub 1',
    description: 'Zone Hub 1',
    orgId: 4,
    hubId: 6,
    index: 0,
    name: 'Zone Hub 1',
    orgId: 4,
    devices: [
      {
        id: 29,
        name: 'Test Org 1',
        description: 'Test Org 1',
        location: 'Test Org 1',
        locationType: '3',
        name: 'Test Org 1',
        updated: '2020-11-19T15:07:39.271Z',
      },
    ],
  },
  {
    id: 18,
    name: 'Zone Hub 2',
    description: 'Zone Hub 2',
    orgId: 4,
    hubId: 6,
    index: 0,
    name: 'Zone Hub 2',
    orgId: 4,
    devices: [
      {
        id: 19,
        name: 'Test Org 2',
        description: 'Test Org 2',
        location: 'Test Org 2',
        locationType: '3',
        name: 'Test Org 2',
        updated: '2020-11-19T15:07:39.271Z',
      },
    ],
  },
  {
    id: 29,
    name: 'Zone Hub 3',
    description: 'Zone Hub 3',
    orgId: 4,
    hubId: 6,
    index: 0,
    name: 'Zone Hub 3',
    orgId: 4,
    devices: [
      {
        id: 39,
        name: 'Test Org 3',
        description: 'Test Org 3',
        location: 'Test Org 3',
        locationType: '3',
        name: 'Test Org 3',
        updated: '2020-11-19T15:07:39.271Z',
      },
    ],
  },
];

export default {
  DEFAULT_WIDGETS_LIST,
  DEFAULT_ZONE_LIST,
};
