import React from 'react'
import { FaComment, FaThumbsUp } from 'react-icons/fa';

function DiscussCard({ discussion }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full max-w-xs">
      <h3 className="text-lg font-semibold mb-3">{discussion.title}</h3>
      <div className="flex items-center text-gray-500 text-sm space-x-4">
        <div className="flex items-center">
          <FaComment className="mr-1" /> {discussion.comments} Comments
        </div>
        <div className="flex items-center">
          <FaThumbsUp className="mr-1" /> {discussion.likes} Likes
        </div>
      </div>
    </div>
  )
}

export default DiscussCard