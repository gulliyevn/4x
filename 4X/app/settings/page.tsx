'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useToastContext } from '@/components/ToastProvider'
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  CreditCard,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Zap,
  Database,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react'

interface SettingsTab {
  id: string
  label: string
  icon: React.ReactNode
}

export default function SettingsPage() {
  const { success, error } = useToastContext()
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Professional trader with 5+ years of experience',
    location: 'New York, USA',
    website: 'https://johndoe.com'
  })

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: '30'
  })

  // Notification settings
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    tradingAlerts: true,
    marketNews: true,
    priceAlerts: true,
    weeklyReports: true,
    soundEnabled: true
  })

  // Appearance settings
  const [appearanceData, setAppearanceData] = useState({
    theme: 'dark',
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'US'
  })

  const tabs: SettingsTab[] = [
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="h-5 w-5" /> },
    { id: 'data', label: 'Data & Privacy', icon: <Database className="h-5 w-5" /> }
  ]

  const handleSave = async (section: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    success('Settings Saved! ✅', `Your ${section} settings have been updated successfully`)
    setIsLoading(false)
  }

  const renderProfileSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          JD
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profile Picture</h3>
          <p className="text-gray-600 dark:text-gray-300">Upload a new avatar</p>
          <div className="flex space-x-2 mt-2">
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
            <Button size="sm" variant="ghost">
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <Input
            value={profileData.firstName}
            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <Input
            value={profileData.lastName}
            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            className="pl-10"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            className="pl-10"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Tell us about yourself"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              className="pl-10"
              placeholder="Your location"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <Input
            value={profileData.website}
            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('profile')}
          disabled={isLoading}
          className="hover-scale"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </motion.div>
  )

  const renderSecuritySettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Security Notice</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Keep your account secure by using a strong password and enabling two-factor authentication.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={securityData.currentPassword}
              onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
              className="pl-10 pr-10"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <Input
              type="password"
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              value={securityData.confirmPassword}
              onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Options</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Add an extra layer of security</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={securityData.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <Button size="sm" variant="outline">
                {securityData.twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Login Alerts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get notified of new logins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.loginAlerts}
                onChange={(e) => setSecurityData({ ...securityData, loginAlerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Session Timeout</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Auto logout after inactivity</p>
            </div>
            <select
              value={securityData.sessionTimeout}
              onChange={(e) => setSecurityData({ ...securityData, sessionTimeout: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('security')}
          disabled={isLoading}
          className="hover-scale"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Security Settings
        </Button>
      </div>
    </motion.div>
  )

  const renderNotificationSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Communication</h3>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser notifications' },
              { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Text message alerts' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationData[item.key as keyof typeof notificationData] as boolean}
                    onChange={(e) => setNotificationData({ 
                      ...notificationData, 
                      [item.key]: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trading Alerts</h3>
          <div className="space-y-4">
            {[
              { key: 'tradingAlerts', label: 'Trading Signals', desc: 'AI-generated trading signals' },
              { key: 'marketNews', label: 'Market News', desc: 'Breaking market news' },
              { key: 'priceAlerts', label: 'Price Alerts', desc: 'Custom price notifications' },
              { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Performance summaries' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationData[item.key as keyof typeof notificationData] as boolean}
                    onChange={(e) => setNotificationData({ 
                      ...notificationData, 
                      [item.key]: e.target.checked 
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {notificationData.soundEnabled ? (
              <Volume2 className="h-6 w-6 text-blue-500" />
            ) : (
              <VolumeX className="h-6 w-6 text-gray-400" />
            )}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Sound Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Play sounds for notifications</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationData.soundEnabled}
              onChange={(e) => setNotificationData({ ...notificationData, soundEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('notifications')}
          disabled={isLoading}
          className="hover-scale"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Notification Settings
        </Button>
      </div>
    </motion.div>
  )

  const renderAppearanceSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'light', label: 'Light', icon: <Sun className="h-5 w-5" /> },
            { value: 'dark', label: 'Dark', icon: <Moon className="h-5 w-5" /> },
            { value: 'system', label: 'System', icon: <Monitor className="h-5 w-5" /> }
          ].map((theme) => (
            <button
              key={theme.value}
              onClick={() => setAppearanceData({ ...appearanceData, theme: theme.value })}
              className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all hover-scale ${
                appearanceData.theme === theme.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {theme.icon}
              <span className="font-medium text-gray-900 dark:text-white">{theme.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Localization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={appearanceData.language}
                onChange={(e) => setAppearanceData({ ...appearanceData, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <select
                value={appearanceData.currency}
                onChange={(e) => setAppearanceData({ ...appearanceData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="RUB">RUB - Russian Ruble</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={appearanceData.timezone}
                onChange={(e) => setAppearanceData({ ...appearanceData, timezone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Moscow">Moscow</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Format</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Format
              </label>
              <select
                value={appearanceData.dateFormat}
                onChange={(e) => setAppearanceData({ ...appearanceData, dateFormat: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD MMM YYYY">DD MMM YYYY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number Format
              </label>
              <select
                value={appearanceData.numberFormat}
                onChange={(e) => setAppearanceData({ ...appearanceData, numberFormat: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="US">1,234.56 (US)</option>
                <option value="EU">1.234,56 (EU)</option>
                <option value="IN">1,23,456.78 (Indian)</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('appearance')}
          disabled={isLoading}
          className="hover-scale"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Appearance Settings
        </Button>
      </div>
    </motion.div>
  )

  const renderDataSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">Data Management</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Manage your personal data, export information, or delete your account.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Data</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Download a copy of your account data including trading history, preferences, and profile information.
          </p>
          <Button variant="outline" className="w-full hover-scale">
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Import Data</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Import trading data from other platforms or restore from a previous backup.
          </p>
          <Button variant="outline" className="w-full hover-scale">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </Card>
      </div>

      <Card className="p-6 border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Danger Zone
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Clear All Data</h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              This will permanently delete all your trading data, preferences, and history. This action cannot be undone.
            </p>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Permanently delete your account and all associated data. This action is irreversible.
            </p>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings()
      case 'security': return renderSecuritySettings()
      case 'notifications': return renderNotificationSettings()
      case 'appearance': return renderAppearanceSettings()
      case 'data': return renderDataSettings()
      default: return renderProfileSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Settings className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Customize your trading experience and manage your account preferences
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-64 flex-shrink-0"
            >
              <Card className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all hover-scale ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1"
            >
              <Card className="p-6 md:p-8">
                {renderTabContent()}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 