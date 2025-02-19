"use client";

import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuCircleUser } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";
import Dropdown from "@/components/admin/navbar/Dropdown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 w-full shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/user" className="text-xl font-bold text-gray-900 dark:text-white">
          Vital Aid
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 dark:text-gray-300 focus:outline-none">
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          <Link href="/user" className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Home
          </Link>

          {/* Users Dropdown */}
          <div>
            <button onClick={handleMenuOpen} className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900">
              services
            </button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/user/doctors">Doctors</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/user/volunteers">Volunteers</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/user/events">Events</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/user/bloodDonors">Blood Donors</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/user/equipments">Equipments</Link>
              </MenuItem>
            </Menu>
          </div>

          <Link href="/about-us" className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            About Us
          </Link>
        </div>

        {/* Icons & Buttons */}
        <div className="hidden lg:flex lg:items-center space-x-4">
          <Button variant="contained" color="success" onClick={() => router.push("/user/donationHome")}>
            Donate now
          </Button>
          <button onClick={() => router.push("/user/message")} className="text-gray-600 dark:text-gray-300 hover:text-gray-900">
            <IoChatbubblesOutline size={20} />
          </button>
          <div className="text-gray-600 dark:text-gray-300 hover:text-gray-900 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <LuCircleUser size={20} />
          </div>
          {dropdownOpen && <Dropdown />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-sky-50 dark:bg-gray-900 py-4 px-6 absolute top-full left-0 w-full z-50">
          <Link href="/user" className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about-us" className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Button variant="contained" color="success" className="w-full" onClick={() => router.push("/user/donationHome")}>
            Donate now
          </Button>
        </div>
      )}
    </nav>
  );
}
