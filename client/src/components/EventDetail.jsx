import React from 'react'
import { useParams } from 'react-router-dom';

function EventDetail({events}) {
    const { id } = useParams();
    const event = events.find((e) => e.id === parseInt(id, 10));
  
    if (!event) {
      return <p>Event not found</p>;
    }
  
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
    <p><strong>Volume:</strong> {event.volume}</p>
    <p><strong>Deadline:</strong> {event.deadline}</p>
    <p><strong>Comments:</strong> {event.comments}</p>
    <h2 className="text-xl font-semibold mt-4">Options:</h2>
    <ul>
      {event.options.map((option, index) => (
        <li key={index}>
          {option.price} - {option.probability}%
        </li>
      ))}
    </ul>
  </div>
  )
}

export default EventDetail