'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { Retailer } from './StoreLocatorMap'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default icon in webpack/Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function MapEmbed({ retailers }: { retailers: Retailer[] }) {
  const center: [number, number] = retailers.length > 0
    ? [retailers[0].lat, retailers[0].lng]
    : [46.603354, 1.888334] // France center

  return (
    <MapContainer
      center={center}
      zoom={retailers.length > 0 ? 10 : 6}
      className="w-full h-[480px] rounded-2xl z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {retailers.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lng]} icon={icon}>
          <Popup>
            <div className="flex flex-col gap-1 min-w-[140px]">
              <strong className="font-semibold">{r.name}</strong>
              {r.address && <p className="text-sm text-gray-600">{r.address}</p>}
              {r.website && (
                <a href={r.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                  Visiter →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
