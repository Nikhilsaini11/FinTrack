import React, { useState } from 'react'
import Logo from './Logo'

const Navbar = (props) => {
    const { scrollToSection, handleClearData } = props;
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
      setMobileMenuOpen(prev => !prev);
    };
    return (
        <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-md shadow-black/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Logo />

                    {/* Menu Links */}
                    <div className="hidden md:flex space-x-6">
                        <button className="text-[#e0e0e0] hover:text-[#ff014f] transition-colors" onClick={() => scrollToSection('dashboard')}>Dashboard</button>
                        <button className="text-[#e0e0e0] hover:text-[#ff014f] transition-colors" onClick={() => scrollToSection('addExpense')}>Add Expense</button>
                        <button className="text-[#e0e0e0] hover:text-[#ff014f] transition-colors" onClick={() => scrollToSection('transactions')}>Transactions</button>
                        <button className="px-4 py-2 font-semibold text-[#ff014f] rounded-md bg-gradient-to-tr from-[#1e2024] to-[#23272b] shadow-lg shadow-white/10 transition-transform transform hover:scale-105" onClick={handleClearData}>Clear Data</button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <button type="button" className="text-[#e0e0e0] hover:text-[#ff014f] focus:outline-none" onClick={toggleMobileMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Items */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden flex flex-col gap-2 fixed top-16 right-4 bg-[#1e2024] shadow-md p-4">
                            <button className="block text-[#e0e0e0] hover:text-[#ff014f] transition-colors w-full text-left" onClick={() => { scrollToSection('dashboard'); setMobileMenuOpen(false); }}>Dashboard</button>
                            <button className="block text-[#e0e0e0] hover:text-[#ff014f] transition-colors w-full text-left" onClick={() => { scrollToSection('addExpense'); setMobileMenuOpen(false); }}>Add Expense</button>
                            <button className="block text-[#e0e0e0] hover:text-[#ff014f] transition-colors w-full text-left" onClick={() => { scrollToSection('transactions'); setMobileMenuOpen(false); }}>Transactions</button>
                            <button className="block text-[#ff014f] bg-gradient-to-tr from-[#1e2024] to-[#23272b] px-4 py-2 rounded-md shadow-lg shadow-white/10 transition-transform transform hover:scale-105 w-full text-left" onClick={() => { handleClearData(); setMobileMenuOpen(false); }}>Clear Data</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>

    )
}

export default Navbar
