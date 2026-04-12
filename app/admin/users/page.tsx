"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Search, Trash2 } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    subscription: {
        planType: string;
        isActive: boolean;
    } | null;
    _count: {
        reports: number;
        usage: number;
    };
}

export default function AdminUsersPage(){

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    },[]);


    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/admin/users");
            setUsers(response.data.users);
            console.log("User data",response.data.users);
        } catch (error) {
            console.error("Error fetching users", error);
        }finally{
           setIsLoading(false); 
        }
    }




return (
   <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">View and manage all platform users</p>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value="searchTerm"
                
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <div className="text-3xl font-bold">length</div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Users className="w-5 h-5" />
            All Users
          </h2>
        </div>
        <div className="px-6 py-4">
          
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
        
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No users found</p>
            </div>
          
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reports
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  
                    <tr  className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">name</div>
                          <div className="text-sm text-gray-500">email</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value=""
                         
                       
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                       
                          <select
                            value=""
                            
                           
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="FREE">FREE</option>
                            <option value="PRO">PRO</option>
                          </select>
                      
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            No subscription
                          </span>
                      
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-900">reports</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-500">
                          
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          
                          className="inline-flex items-center justify-center p-1.5 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                
                </tbody>
              </table>
            </div>
          
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Admins</p>
          <div className="text-2xl font-bold text-red-600">
          ADMIN
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Pro Users</p>
          <div className="text-2xl font-bold text-purple-600">
           PRO
        </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Free Users</p>
          <div className="text-2xl font-bold text-blue-600">
           FREE
          </div>
        </div>
      </div>
    </div>  
)



}