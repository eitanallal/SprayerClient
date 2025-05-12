// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  setSystemStatus,
  updateGPSData,
  updateHealthData,
} from './system.slice';
import { NozzleState } from '../enums/nozzle-state.enum';
import { toast } from 'react-toastify';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://52.207.250.139:80' }),
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
          throw new Error('Error in updating system state');
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
          throw new Error('Error in updating GPS data');
        }
      },
    }),

    getHealthData: builder.query<any, void>({
      query: () => '/health',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // const toastLoadingHealthId = toast.loading('Loading health data...');

        try {
          const { data } = await queryFulfilled;
          console.log(data.time_since_last_GPS_data);
          if (data.time_since_last_GPS_data > 30) {
            const existingToast = toast.isActive('no-gps-warn-toast');
            if (!existingToast) {
              toast.warning(
                `No GPS for ${Math.floor(data.time_since_last_GPS_data)}s`,
                {
                  toastId: 'no-gps-warn-toast',
                  autoClose: false,
                }
              );
            } else {
              // If the toast exists, update its content
              toast.update('no-gps-warn-toast', {
                render: `No GPS supplied for ${Math.floor(
                  data.time_since_last_GPS_data
                )}s`, // Update message
                type: 'warning', // Ensure the type remains warning
                isLoading: false, // No longer loading
                autoClose: false, // Stay indefinitely
              });
            }
          } else {
            if (toast.isActive('no-gps-warn-toast'))
              toast.dismiss('no-gps-warn-toast');
          }
          dispatch(
            updateHealthData({
              health: data,
            })
          );
        } catch (err) {
          toast.error("Communication Issue: can't connect to API", {
            toastId: 'api-error-toast',
            autoClose: false,
          });
          throw new Error('Error in updating Health data');
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
  useGetHealthDataQuery,
} = apiSlice;
