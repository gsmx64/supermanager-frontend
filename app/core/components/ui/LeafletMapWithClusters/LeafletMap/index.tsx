"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { type FC, type ReactNode } from "react";
import type { MapOptions } from "leaflet";
import 'leaflet/dist/leaflet.css';

import { Spinner } from "@/core/components/ui/Spinner";


export const LeafletMap: FC<
  {
    center: [number, number]
    children: ReactNode
    zoom: number
    style: React.CSSProperties
  } & MapOptions
> = ({ children, style, ...options }) => {
  const isClient = typeof window !== "undefined";

  if (!isClient) {
    return <Spinner />;
  }

  return (
    <MapContainer
      className="h-[200px] w-full relative"
      maxZoom={18}
      style={style}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {children}
    </MapContainer>
  )
}
