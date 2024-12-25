import React from 'react'
import EventCard from './EventCard';

function EventArea({events}) {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  
  )
}

export default EventArea