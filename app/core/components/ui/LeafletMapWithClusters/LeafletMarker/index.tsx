"use client";

import type { FC } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export const LeafletMarker: FC<
  {
    marker: {
      index: number
      position: [number, number]
      title: string
      address: string
    }
  }
> = ({ marker }: any) => {
  const map = useMap();

  return (
    <div>
      <Marker
        key={marker.index}
        position={marker.position}
        //icon={icon}
        eventHandlers={{
          click: (e) => {
            map.flyTo(e.latlng, 14);
          },
        }}
      >
        <Popup>
          <div>
            <strong>{marker.title}</strong>
            <br />
            {marker.address}
          </div>
        </Popup>
      </Marker>
    </div>
  );
}
