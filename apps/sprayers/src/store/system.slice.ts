import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nozzle } from '../types/nozzle.type';
import { GPSDataType } from '../types/GPSData.type';
import { HealthDataType } from '../types/HealthData.type';

export enum NozzleState {
  ON = 'ON',
  OFF = 'OFF',
}

const initialState: {
  tankLevel: string;
  systemStatus: string;
  nozzles: Nozzle[];
  GPSdata: GPSDataType;
  health: HealthDataType;
} = {
  systemStatus: '',
  nozzles: [
    { name: '1', flow: 0, status: NozzleState.OFF },
    { name: '2', flow: 0, status: NozzleState.OFF },
    { name: '3', flow: 0, status: NozzleState.OFF },
    { name: '4', flow: 0, status: NozzleState.OFF },
    { name: '5', flow: 0, status: NozzleState.OFF },
    { name: '6', flow: 0, status: NozzleState.OFF },
    { name: '7', flow: 0, status: NozzleState.OFF },
    { name: '8', flow: 0, status: NozzleState.OFF },
  ],
  tankLevel: '0',
  GPSdata: {
    lat: 0,
    lon: 0,
    speed: 0,
    time: 0,
    heading: 0,
    alt: 0,
  },
  health: { time_since_last_GPS_data: null },
};

const systemReducer = createSlice({
  name: 'nozzles',
  initialState,
  reducers: {
    setSystemStatus: (
      state,
      action: PayloadAction<{
        systemStatus: string;
        nozzles: Nozzle[];
        tankLevel: string;
      }>
    ) => {
      state.nozzles = action.payload.nozzles;
      state.systemStatus = action.payload.systemStatus;
      state.tankLevel = action.payload.tankLevel;
    },
    updateNozzleStatus: (
      state,
      action: PayloadAction<{ nozzleId: string; nozzleState: NozzleState }>
    ) => {
      const nozzle = state.nozzles.find(
        (n) => n.name === action.payload.nozzleId
      );
      if (nozzle) {
        nozzle.status = action.payload.nozzleState;
      }
    },
    updateGPSData: (state, action: PayloadAction<{ GPSdata: GPSDataType }>) => {
      state.GPSdata = action.payload.GPSdata;
    },
    updateHealthData: (
      state,
      action: PayloadAction<{ health: HealthDataType }>
    ) => {
      state.health = action.payload.health;
    },
  },
});

export const {
  setSystemStatus,
  updateNozzleStatus,
  updateGPSData,
  updateHealthData,
} = systemReducer.actions;
export default systemReducer.reducer;
