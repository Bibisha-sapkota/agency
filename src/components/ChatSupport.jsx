import React, { useState, useEffect, useRef } from 'react'

export default function ChatSupport() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'agent', text: 'Welcome to Chat Support! How can I help you today?', time: '10:00' },
    { id: 2, from: 'user', text: 'Hi, I have a question about a transaction.', time: '10:01' }
  ])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    const newMsg = { id: Date.now(), from: 'user', text: trimmed, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    setMessages(prev => [...prev, newMsg])
    setInput('')

    // mock agent reply
    setTimeout(() => {
      const reply = { id: Date.now()+1, from: 'agent', text: 'Thanks — we are looking into that. Can you share the Transaction ID?', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      setMessages(prev => [...prev, reply])
    }, 800)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-[520px] flex flex-col">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Support</div>
          <div className="text-sm font-extrabold text-slate-800">Chat Support</div>
        </div>
        <div className="text-xs text-slate-400">Online</div>
      </div>

      <div ref={listRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
        {messages.map(m => (
          <div key={m.id} className={`${m.from === 'user' ? 'self-end' : 'self-start'} max-w-[85%]` }>
            <div className={`px-4 py-2 rounded-2xl text-sm ${m.from === 'user' ? 'bg-[#E51E25] text-white' : 'bg-white text-slate-800 border border-slate-100'}`}>
              {m.text}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{m.time}</div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 flex gap-3 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
        />
        <button onClick={sendMessage} className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 py-2 rounded-xl text-sm font-bold">Send</button>
      </div>
    </div>
  )
}
