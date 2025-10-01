import { Suspense, lazy } from "react";
import type { FC } from "react";
import type { MapOptions } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";


const LazyLeafletMap = lazy(
  async () => ({ default: (await import('./LeafletMap')).LeafletMap })
);

const LazyMarkerCluster = lazy(
  async () => ({ default: (await import('./MarkerCluster')).MarkerCluster })
);

const LazyLeafletMarker = lazy(
  async () => ({ default: (await import('./LeafletMarker')).LeafletMarker })
);

type Marker = {
  index: number;
  position: [number, number];
  title?: string;
  address?: string;
};

const LeafletMapWithClusters: FC<
  {
    center: [number, number];
    markers: Marker[];
    style?: React.CSSProperties;
    options?: MapOptions;
  } & MapOptions
> = ({ center, markers, style, ...options }) => {
  return (
    <Suspense fallback={<div className="h-[200px]" />}>
      <LazyLeafletMap center={center} zoom={13} style={{ ...style }} {...options}>
        <Suspense fallback={<></>}>
          <LazyMarkerCluster>
            {markers.map((marker, index) => (
              <LazyLeafletMarker
                key={index}
                marker={{
                  ...marker,
                  index,
                  title: marker.title ?? "",
                  address: marker.address ?? ""
                }}
              />
            ))}
          </LazyMarkerCluster>
        </Suspense>
      </LazyLeafletMap>
    </Suspense>
  );
};

export default LeafletMapWithClusters;
