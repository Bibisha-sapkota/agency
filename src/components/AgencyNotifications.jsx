import React from 'react'
import { Megaphone, Check, CheckCircle2 } from 'lucide-react'

export default function AgencyNotifications({ announcementData, setAnnouncementData }) {
  const toggleReadStatus = (id) => {
    setAnnouncementData(announcementData.map(item => 
      item.id === id ? { ...item, read: !item.read } : item
    ))
  }

  const formatTime = (date) => {
    const today = new Date()
    const notificationDate = new Date(date)
    const diffTime = Math.abs(today - notificationDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return notificationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
        <Megaphone className="w-4 h-4 text-[#E51E25]" /> Notifications
      </h3>
      <div className="space-y-2">
        {announcementData.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`p-4 rounded-lg border cursor-pointer hover:bg-slate-50 transition-colors ${
              !announcement.read ? 'bg-white border-l-4 border-l-[#E51E25] border-slate-200' : 'bg-slate-50 border-slate-200'
            }`}
            onClick={() => toggleReadStatus(announcement.id)}
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                  announcement.notificationType === 'Join Request' ? 'bg-blue-100 text-blue-700' :
                  announcement.notificationType === 'Leave Request' ? 'bg-red-100 text-red-700' :
                  announcement.notificationType === 'Withdraw Request' ? 'bg-purple-100 text-purple-700' :
                  announcement.notificationType === 'Package Expiry' ? 'bg-orange-100 text-orange-700' :
                  announcement.notificationType === 'Monthly Target' ? 'bg-green-100 text-green-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {announcement.notificationType}
                </span>
                <h4 className={`font-semibold text-sm ${!announcement.read ? 'text-slate-900' : 'text-slate-600'}`}>
                  {announcement.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {announcement.read ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#E51E25]" />
                )}
              </div>
            </div>
            <p className={`text-sm mb-2 leading-relaxed ${!announcement.read ? 'text-slate-700' : 'text-slate-500'}`}>
              {announcement.message}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{formatTime(announcement.date)}</span>
              {announcement.priority === 'High' && (
                <span className="text-xs font-medium text-red-600">Urgent</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
