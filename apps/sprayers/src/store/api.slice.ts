// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setSystemStatus, updateGPSData } from './system.slice';
import { NozzleState } from '../enums/nozzle-state.enum';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    // POST /command
    sendCommand: builder.mutation<
      any,
      {
        id: string;
        SystemCommand?: string;
        ForceSprayRate?: number;
        SprayRate?: number;
        nozzleOpen?: { [key: string]: boolean };
      }
    >({
      query: (body) => ({
        url: '/command',
        method: 'POST',
        body,
      }),
    }),

    // GET /status
    getSystemStatus: builder.query<any, void>({
      query: () => '/status',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setSystemStatus({
              nozzles: Object.entries(data.nozzleOpen).map(([key, value]) => ({
                name: key,
                flow:
                  data.nozzleFlowRates[
                    key as keyof typeof data.nozzleFlowRates
                  ] || 0,
                status: value ? NozzleState.ON : NozzleState.OFF,
              })),
              systemStatus: data.system_state,
              tankLevel: data.tankLevel,
            })
          );
        } catch (err) {
          console.error('Eitan is here');
          // Handle error if needed
        }
      },
    }),

    // GET /logs
    getLogs: builder.query<Blob, void>({
      query: () => ({
        url: '/logs',
        responseHandler: (response) => response.blob(), // handle file
      }),
    }),

    getGPSData: builder.query<any, void>({
      query: () => '/gps',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateGPSData({
              GPSdata: data,
            })
          );
        } catch (err) {
          console.error('Eitan is here');
        }
      },
    }),
  }),
});

// Export hooks
export const {
  useSendCommandMutation,
  useGetSystemStatusQuery,
  useGetLogsQuery,
  useGetGPSDataQuery,
} = apiSlice;
