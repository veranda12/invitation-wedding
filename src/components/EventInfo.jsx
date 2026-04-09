import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { WEDDING_CONFIG } from '../lib/constants'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default marker icon
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

/**
 * Informasi acara dengan peta interaktif
 */
export default function EventInfo() {
  const { events } = WEDDING_CONFIG

  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)' }}>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}>
            Save The Date
          </p>
          <h2 className="text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Informasi Acara
          </h2>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="glass rounded-3xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              {/* Map */}
              <div className="h-48 w-full relative">
                <MapContainer
                  center={event.mapCenter}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%', borderRadius: '0' }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={event.mapCenter}>
                    <Popup>
                      <strong>{event.venue}</strong><br />
                      {event.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
                  {event.title}
                </h3>

                <div className="space-y-3">
                  <InfoRow icon="📅" label="Tanggal" value={event.date} />
                  <InfoRow icon="🕐" label="Waktu" value={event.time} />
                  <InfoRow icon="📍" label="Tempat" value={event.venue} />
                  <InfoRow icon="🗺️" label="Alamat" value={event.address} />
                  {event.dresscode && (
                    <InfoRow icon="👔" label="Dress Code" value={event.dresscode} />
                  )}
                </div>

                {/* Google Maps Link */}
                <motion.a
                  href={`https://www.google.com/maps/search/?api=1&query=${event.mapCenter[0]},${event.mapCenter[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, var(--color-warm-brown), var(--color-gold-dark))' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Buka Maps
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-base mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-sage)' }}>
          {label}
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--color-charcoal)' }}>
          {value}
        </p>
      </div>
    </div>
  )
}
