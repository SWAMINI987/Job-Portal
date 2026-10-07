import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Left Side */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              © 2026 Your Company. All rights reserved.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex gap-4 text-gray-600 font-medium">
            <span>Twitter</span>
            <span>Linkedin</span>
            <span>Github</span>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer