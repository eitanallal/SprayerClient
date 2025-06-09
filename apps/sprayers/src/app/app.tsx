import { Header } from '../components/header';
import { Nozzles } from '../components/nozzles';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import {
  useGetGPSDataQuery,
  useGetHealthDataQuery,
  useGetSystemStatusQuery,
  useSendCommandMutation,
} from '../store/api.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/button';

export function App() {
  const {} = useGetSystemStatusQuery(undefined, { pollingInterval: 1000 });

  const {} = useGetGPSDataQuery(undefined, {
    pollingInterval: 1000,
  });

  const systemState = useSelector(
    (state: RootState) => state.system.systemStatus
  );

  const {} = useGetHealthDataQuery(undefined, {
    pollingInterval: 1000,
  });

  const [sendCommand] = useSendCommandMutation();

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick={true}
      />

      <Header />
      <div className="flex gap-10 w-full h-full justify-between p-4">
        <div>
          <div className="flex gap-2 w-full">
            Requested Mode:
            <select
              onChange={(e) =>
                sendCommand({ id: 'aaaa', SystemCommand: e.target.value })
              }
            >
              <option>MIXING</option>
              <option>SPRAYING</option>
              <option>MAINTENANCE</option>
              <option>STOP</option>
              <option>CONSTANT_SPRAY</option>
            </select>
          </div>
          <div className="flex gap-2">
            Current Mode:
            <div className="font-bold">
              {systemState ? systemState : 'UNKNOWN'}
            </div>
          </div>

          <Nozzles />
        </div>
        <div className="w-full h-15rem py-2">
          <MapContainer
            center={[31.885, 34.961]}
            zoom={18}
            scrollWheelZoom={true}
            style={{
              height: '95%',
            }}
          >
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={20}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
            <Marker position={[31.885, 34.961]} />
          </MapContainer>
        </div>
      </div>
      <div className="w-full px-4 py-2 bg-grey-200 h-40 flex flex-col gap-4 flex-wrap justify-between items-center">
        <Button
          text="STOP"
          color="red"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="Homing"
          color="blue"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="Protocol 1"
          color="grey1"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="Protocol 2"
          color="grey1"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="Selective 1"
          color="grey2"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="Selective 2"
          color="grey2"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="Washing"
          color="green"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="TBD"
          color="white"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="TBD"
          color="white"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
        <Button
          text="TBD"
          color="white"
          onClick={async () => {
            const response = await fetch('https://google.com');
            const data = await response.json();
            console.log(data);
          }}
        />
      </div>
    </div>
  );
}

export default App;
