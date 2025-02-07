import React from 'react';

import { FaBell, FaHeart, FaHome, FaPhone, FaPlusCircle, FaStethoscope, FaUser } from 'react-icons/fa';
import { Button, Card, CardContent } from '@mui/material';
import { FiFileText } from 'react-icons/fi';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="flex">
        
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">Welcome</h2>
              <p className="text-sm text-gray-600">Your mind angels, real doctors helpful real light</p>
            </div>

            <div className="space-y-2">
              <Button variant="text" className="w-full justify-start gap-2">
                <FaHome className="w-4 h-4" />
                User Menu
              </Button>
              <Button variant="text" className="w-full justify-start gap-2">
                <FaBell className="w-4 h-4" />
                Report & Staff
              </Button>
              <Button variant="text" className="w-full justify-start gap-2">
                <FaPhone className="w-4 h-4" />
                Call / Fix
              </Button>
              <Button variant="text" className="w-full justify-start gap-2">
                <FiFileText className="w-4 h-4" />
                Lines & Reports
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quick Access Stats</h3>
              <div className="space-y-2">
                <Button variant="contained" className="w-full justify-start gap-2">
                  <FaHeart className="w-4 h-4 text-red-500" />
                  Request Blood
                </Button>
                <Button variant="contained" className="w-full justify-start gap-2">
                  <FaUser className="w-4 h-4" />
                  Request Medical Equipment
                </Button>
                <Button variant="contained" className="w-full justify-start gap-2">
                  <FaStethoscope className="w-4 h-4" />
                  Consult a Doctor
                </Button>
                <Button variant="contained" className="w-full justify-start gap-2">
                  <FaUser className="w-4 h-4" />
                  Donate to Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex-1 p-6">
          {/* Stats Card */}
          <Card className="mb-6">
            <CardContent className="flex items-center p-6">
              <div>
                <h2 className="text-4xl font-bold">€3m</h2>
                <p className="text-gray-600">Daily test range in highly</p>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mb-4">Recent Notification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaHeart className="w-4 h-4 text-red-500" />
                  <h3 className="font-medium">Donate Blood</h3>
                </div>
                <div className="flex justify-between mt-2">
                  <span>1.0 pets</span>
                  <span className="text-gray-500">Available waiting</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiFileText className="w-4 h-4 text-blue-500" />
                  <h3 className="font-medium">Calendar Rules</h3>
                </div>
                <div className="flex justify-between mt-2">
                  <span>2.50 pets</span>
                  <span className="text-gray-500">Latest waiting</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Emergency, Pageryord Flank Names</h3>
              <div className="flex justify-between items-center">
                <span>3/4th</span>
                <Button variant="contained" color="error">Connect to Emergency</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;