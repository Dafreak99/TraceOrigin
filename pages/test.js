import ReactMapGL, { Source, Layer } from "react-map-gl";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.4, 37.8],
          [-123.3, 38.2],
        ],
      },
    },
  ],
};

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const Test = () => {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14,
  });
  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/haitran99/ckfdyhnap5r9219rwu2xr70qs"
      mapboxApiAccessToken="pk.eyJ1IjoiaGFpdHJhbjk5IiwiYSI6ImNrMmtlNnhlbjB6Y2kzY29oc2Q2YnRlOXoifQ.ZwtkHfNjr_Ltp39bQj8hSg"
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
};

export default Test;
