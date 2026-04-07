"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, CreditCard, Shield, Bell,Upload,CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import toast, {Toaster} from "react-hot-toast";

export default function SettingsPage(){

    const {data: session, update} = useSession();
    const router = useRouter();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/user/profile");
                setProfileName(response.data.user.name || "");
            } catch (error) {
                setDisplayName(session?.user?.name || "");
            }
        };
        fetchProfile();
    },[]);

    const startEditingProfile = () => {
        setProfileName(session?.user?.name || "");
        setIsEditingProfile(true);
    }


return (
     <>
<Toaster position="top-right" />
<div className="max-w-4xl mx-auto space-y-6">
{/* Header */}
<div>
    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
    <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
</div>

        {/* Profile Section */}
<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
    <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
    </div>
    <p className="text-sm text-gray-500 mt-0.5">Your account details and information</p>
    </div>
    <div className="px-6 py-4 space-y-4">
    {!isEditingProfile ? ( 
        <>
        <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <p className="text-gray-900 mt-1">
                {profileName || session?.user?.name}</p>
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900 mt-1">{session?.user?.email}</p>
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <div className="mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {(session?.user as any)?.role || "USER"}
            </span>
            </div>
        </div>
        <button
            onClick={startEditingProfile}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        >
            Edit Profile
        </button>
        </>
        ) : ( 
        <form   className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
            </label>
            <input
            type="text"
            id="name"
            value={profileName}
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            minLength={2}
            maxLength={50}
            />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700">Email (cannot be changed)</label>
            <p className="text-gray-500 mt-1">email</p>
        </div>
        <div className="flex gap-2">
            <button
            type="submit"
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            Save Changes
            </button>
            <button
            type="button"
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            Cancel
            </button>
        </div>
        </form>
        )}
    </div>
</div>

        {/* Subscription Section */}
<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
    <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
    </div>
    <p className="text-sm text-gray-500 mt-0.5">Manage your subscription and billing</p>
    </div>
    <div className="px-6 py-4 space-y-4">
    <div>
        <label className="text-sm font-medium text-gray-700">Current Plan</label>
        <div className="flex items-center gap-2 mt-1">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
        FREE
        </span>
        <span className="text-sm text-gray-600">
        Unlimited validations
        </span>
        </div>
    </div>

    {/* Pending Payment Notice */}
    
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
                <h4 className="font-semibold text-yellow-900">Payment Pending</h4>
                <p className="text-sm text-yellow-800 mt-1">
                Your payment request is awaiting admin approval. You'll be upgraded to Pro once approved.
                </p>
            </div>
            </div>
            <button
            
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            Refresh Status
            </button>
        </div>
        </div>
          

            {/* Approved Payment Notice */}
            
<div className="bg-green-50 border border-green-200 rounded-lg p-4">
<div className="flex items-start justify-between gap-2">
    <div className="flex items-start gap-2">
    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
    <div>
        <h4 className="font-semibold text-green-900">Payment Approved!</h4>
        <p className="text-sm text-green-800 mt-1">
        Your payment has been approved. Click "Refresh Status" to update your plan to Pro.
        </p>
    </div>
    </div>
    <button
    
    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
    Refresh Status
    </button>
</div>
</div>



<>

    <p className="text-sm text-gray-600">
    Your Pro plan is active until{" "}
    endDate
    </p>

<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h4 className="font-semibold text-blue-900 mb-2">Pro Plan Benefits</h4>
    <ul className="text-sm text-blue-800 space-y-1">
    <li>✓ Unlimited niche validations</li>
    <li>✓ Deep AI-powered analysis</li>
    <li>✓ Export reports to PDF</li>
    <li>✓ Priority support</li>
    <li>✓ Trending niches alerts</li>
    </ul>
</div>
<button
    
    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
>
    Downgrade to Free
</button>
</>

<>
<p className="text-sm text-gray-600">
    Upgrade to Pro for unlimited validations, deep analysis, and export features
</p>
<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
    <h4 className="font-semibold text-gray-900 mb-2">Pro Plan Includes:</h4>
    <ul className="text-sm text-gray-700 space-y-1">
    <li>✓ Unlimited niche validations</li>
    <li>✓ Deep AI-powered analysis</li>
    <li>✓ Export reports to PDF</li>
    <li>✓ Priority support</li>
    <li>✓ Trending niches alerts</li>
    </ul>
    <div className="mt-3 pt-3 border-t border-gray-300">
    <p className="text-lg font-bold text-gray-900">$29/month</p>
    </div>
</div>

<button
    
    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
>
Upgrade via Bank Transfer
</button>

{/* Bank Transfer Form */}

    <div className="border border-gray-300 rounded-lg p-4 space-y-4 bg-white">
    <div>
        <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer Details</h4>
        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
        <p><strong>Bank Name:</strong> Example Bank</p>
        <p><strong>Account Name:</strong> NicheCopy Ltd</p>
        <p><strong>Account Number:</strong> 1234567890</p>
        <p><strong>Amount:</strong> $29.00 USD</p>
        </div>
    </div>

    <form className="space-y-4">
        <div>
        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
            Transaction ID / Reference Number
        </label>
        <input
            type="text"
            id="transactionId"
            value="transactionId"
            
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your transaction ID"
            required
            minLength={5}
        />
        </div>

        <div>
        <label htmlFor="invoice" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Payment Proof (JPG, PNG, or PDF)
        </label>
        <div className="flex items-center gap-2">
            <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Choose file
            <input
                type="file"
                id="invoice"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                
                className="hidden"
                required
            />
            </label>
        </div>
        <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
        </div>

        <div className="flex gap-2">
        <button
            type="submit"
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            Submit Payment Request
        </button>
        <button
            type="button"
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        >
            Cancel
        </button>
        </div>
    </form>
    </div>


{/* Payment Requests History */}

    <div className="border-t border-gray-200 pt-4">
    <h4 className="font-semibold text-gray-900 mb-3">Payment Requests</h4>
    <div className="space-y-2">
        
        <div
            
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
            <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
                Transaction:  
            </p>
            <p className="text-xs text-gray-500">
                createdAt
            </p>
            </div>
            <div className="flex items-center gap-2">
            
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
    </div>

</>

</div>
</div>

        {/* Security Section */}
<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
    <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Security</h2>
    </div>
    <p className="text-sm text-gray-500 mt-0.5">Manage your password and security settings</p>
    </div>
    <div className="px-6 py-4 space-y-4">
    
        <>
        <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <p className="text-sm text-gray-600 mt-1">••••••••</p>
        </div>
        <button
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        >
            Change Password
        </button>
        </>
    
        <form   className="space-y-4">
        <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
            </label>
            <input
            type="password"
            id="currentPassword"
            value="currentPassword"
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            />
        </div>
        <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
            </label>
            <input
            type="password"
            id="newPassword"
            value="newPassword"
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
        </div>
        <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
            </label>
            <input
            type="password"
            id="confirmPassword"
            value="confirmPassword"
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            minLength={6}
            />
        </div>
        <div className="flex gap-2">
            <button
            type="submit"
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            Change Password
            </button>
            <button
            type="button"
            
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            Cancel
            </button>
        </div>
        </form>
    
    </div>
</div>

{/* Notifications Section */}
<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
    <div className="flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
    </div>
    <p className="text-sm text-gray-500 mt-0.5">Manage your notification preferences</p>
    </div>
    <div className="px-6 py-4 space-y-4">
    <div className="flex items-center justify-between">
        <div>
        <p className="font-medium text-gray-900">Email Notifications</p>
        <p className="text-sm text-gray-600">Receive email when validations are complete</p>
        </div>
        <button
        disabled
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
        >
        Coming Soon
        </button>
    </div>
    <div className="flex items-center justify-between">
        <div>
        <p className="font-medium text-gray-900">Trending Niches Alert</p>
        <p className="text-sm text-gray-600">Get notified about trending niches (Pro only)</p>
        </div>
        <button
        disabled
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
        >
        Coming Soon
        </button>
    </div>
    </div>
</div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg border border-red-200 shadow-sm">
          <div className="px-6 py-4 border-b border-red-200">
            <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
            <p className="text-sm text-gray-500 mt-0.5">Irreversible actions</p>
          </div>
          <div className="px-6 py-4">
            <button
              disabled
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-not-allowed opacity-50"
            >
              Delete Account (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </>    
)



}