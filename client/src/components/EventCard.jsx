import React from 'react'
import { FaCalendarAlt, FaComment, FaThumbtack, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EventCard({event}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full max-w-xs flex flex-col justify-between">
      {/* 标题区域 */}
        <Link 
          to={`/event/${event.id}`}  className="h-14 flex items-center">
          <h3 className="text-base font-semibold">{event.title}</h3>
        </Link>
      {/* 选项区域 */}
      <div className="space-y-2 mb-4 max-h-24 overflow-y-auto scrollbar-hide">
        {event.options.map((option, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-gray-800">{option.price}</span>
            <span className="text-gray-500">{option.probability}%</span>
            <div className="flex space-x-2">
              <button className="bg-green-100 text-green-600 px-2 py-1 rounded-full hover:bg-green-200 text-xs">
                Yes
              </button>
              <button className="bg-red-100 text-red-600 px-2 py-1 rounded-full hover:bg-red-200 text-xs">
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 底部信息区域 */}
      <div className="flex items-center justify-between text-gray-500 text-xs mt-auto pt-2 border-t border-gray-200">
        <div className="flex items-center">
          <FaThumbtack className="mr-1" />
          <span>{event.volume} Vol.</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-1" />
          <span>{event.deadline}</span>
        </div>
        <div className="flex items-center">
          <FaComment className="mr-1" />
          <span>{event.comments}</span>
        </div>
        <FaStar className="text-gray-400 hover:text-yellow-500 cursor-pointer" />
      </div>
    </div>
  )
}

export default EventCard