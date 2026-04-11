"use client";

import { useState,useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import toast, {Toaster} from "react-hot-toast";

export default function AdminPaymentRequestPage(){

  const [paymentRequests, setPaymentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);


  useEffect(() => {
    fetchPaymentRequests();
  },[]);
 

  const fetchPaymentRequests = async () => {
    try {
        setLoading(true);
        const response = await axios.get("/api/admin/payment-requests");
        setPaymentRequests(response.data.paymentRequests);
        console.log("Request", response.data.paymentRequests);
        
    } catch (error) {
        console.error("Fetch payment requests error", error);
    } finally {
        setLoading(false);
    }
  }




    return (
         <>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Requests</h1>
          <p className="text-gray-600 mt-1">Review and manage bank transfer payment requests from users</p>
        </div>

        {/* Payment Requests List */}
        <div className="grid gap-4">
          
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="py-10 px-6 text-center text-gray-500">
                No payment requests found
              </div>
            </div>
        
          
              <div   className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                     name
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">email</p>
                    </div>
                    <div>
                      
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                    
                      
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" />
                          Approved
                        </span>
                      
                      
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" />
                          Rejected
                        </span>
                     
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Transaction ID
                      </label>
                      <p className="text-sm text-gray-900 mt-1 font-mono">
                      transactionId
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Submitted On
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                       createdAt
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Payment Proof
                    </label>
                    <a
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
                    >
                      <Eye className="w-4 h-4" />
                      View Invoice
                    </a>
                  </div>

                
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-900">Rejection Reason:</p>
                      <p className="text-sm text-red-800 mt-1">rejectedReason</p>
                    </div>
                

                   
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        Approved on  
                      </p>
                    </div>
                  

                 
                    <div className="flex gap-2 pt-2">
                      <button
                       
                       
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                       Approve & Upgrade to Pro
                      </button>
                      <button
                        
                       
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
               
                </div>
              </div>
         
        </div>

        {/* Reject Modal */}
    
          {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reject Payment Request
              </h3>
              <textarea
                value="rejectReason"
               
                placeholder="Enter reason for rejection..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 min-h-[100px]"
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  
                 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                Confirm Reject
                </button>
                <button
                   
                  
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div> */}
        
      </div>
    </>
    )
}