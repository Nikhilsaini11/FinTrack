import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            {/* Icon or logo shape */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1e2024] to-[#23272b] flex items-center justify-center shadow-md shadow-white/20">
                <span className="text-[#ff014f] font-bold text-xl">F</span>
            </div>

            {/* Logo Text */}
            <h1 className="text-3xl font-bold text-[#e0e0e0] tracking-wider">
                Fin<span className="text-[#ff014f]">Track</span>
            </h1>
        </div>

    )
}

export default Logo
