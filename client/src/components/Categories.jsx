import React from 'react'

function Categories() {
    const categories = [
        { name: 'LIVE', live: true },
        { name: 'All', live: false },
        { name: 'New', live: false },
        { name: 'Creators', live: false },
        { name: 'Sports', live: false },
        { name: 'Politics', live: false },
        { name: 'Crypto', live: false },
        { name: 'Business', live: false },
        { name: 'Tech', live: false },
      ];
    return (<div className="flex items-center space-x-6 px-6 py-3 bg-white border-b shadow-sm">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer ${
              category.live ? 'text-red-500 font-semibold' : 'text-gray-700'
            } hover:text-black`}
          >
            {category.name}
            {category.live && <span className="ml-1 text-red-500">•</span>}
          </div>
        ))}
      </div>
    )
}

export default Categories