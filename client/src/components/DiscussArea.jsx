import React from 'react'
import DiscussCard from './DiscussCard';

function DiscussArea() {
    const discussions = [
        { id: 1, title: 'Will Bitcoin hit $100k in 2024?', comments: 523, likes: 204 },
        { id: 2, title: 'Is AI the future of work?', comments: 312, likes: 152 },
        { id: 3, title: 'Global warming impacts on sea levels', comments: 450, likes: 341 },
        // 更多讨论数据...
      ];
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Discussions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {discussions.map((discussion) => (
          <DiscussCard key={discussion.id} discussion={discussion} />
        ))}
      </div>
    </div>
  
  )
}

export default DiscussArea