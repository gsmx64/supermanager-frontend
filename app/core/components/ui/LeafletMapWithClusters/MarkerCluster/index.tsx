"use client";

import { divIcon, point } from "leaflet";
/// @ts-ignore
import BaseMarkerCluster from "react-leaflet-markercluster";
import type { FC, ReactNode } from "react";

const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className:
      'bg-[#e74c3c]/100 text-white font-bold flex! items-center justify-center rounded-3xl border-white/50 border-4',
    iconSize: point(40, 40, true),
  })
}

export const MarkerCluster: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <BaseMarkerCluster
      iconCreateFunction={createClusterCustomIcon}
      showCoverageOnHover={false}
    >
      {children}
    </BaseMarkerCluster>
  )
}
