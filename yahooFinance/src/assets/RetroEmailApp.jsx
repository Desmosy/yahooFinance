import React, { useState } from 'react';

const RetroEmailApp = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      from: 'cooluser@aol.com',
      subject: 'Check out this AWESOME site!',
      body: 'Hey there! I found the most radical website ever. You HAVE to see this!!!1! \n\nP.S. Don\'t forget to turn on your sound for the sweet background MIDI!',
      date: '1997-06-15T10:30:00',
      read: false
    },
    {
      id: 2,
      from: 'netscape@geocities.com',
      subject: 'Your New Email!',
      body: 'Welcome to the INFORMATION SUPERHIGHWAY! \n\nThis is your brand new email account. Get ready to SURF THE WEB!',
      date: '1997-06-14T15:45:00',
      read: true
    }
  ]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="p-2 bg-[#008080]" 
      style={{
        fontFamily: "'MS Sans Serif', Geneva, sans-serif",
        border: '4px solid',
        borderColor: '#808080 #FFFFFF #FFFFFF #808080',
        boxShadow: 'inset 1px 1px 0 0 #000000, 1px 1px 0 0 #000000'
      }}
    >
      {}
      <div 
        className="bg-[#000080] text-white flex justify-between p-1 mb-2"
        style={{
          fontWeight: 'bold',
          fontSize: '12px',
          borderBottom: '1px solid #FFFFFF'
        }}
      >
        <span>📧 Retro Email Client</span>
        <div>
          <button className="mr-1 bg-[#C0C0C0] text-black px-2 border-2" 
            style={{
              borderColor: '#808080 #FFFFFF #FFFFFF #808080',
              fontSize: '10px'
            }}>-</button>
          <button className="mr-1 bg-[#C0C0C0] text-black px-2 border-2" 
            style={{
              borderColor: '#808080 #FFFFFF #FFFFFF #808080',
              fontSize: '10px'
            }}>□</button>
          <button className="bg-[#C0C0C0] text-black px-2 border-2" 
            style={{
              borderColor: '#808080 #FFFFFF #FFFFFF #808080',
              fontSize: '10px'
            }}>X</button>
        </div>
      </div>

      {}
      <div 
        className="flex bg-[#C0C0C0] p-1 mb-2"
        style={{
          border: '1px solid',
          borderColor: '#FFFFFF #808080 #808080 #FFFFFF'
        }}
      >
        <button 
          className="mr-1 px-2 py-1 bg-[#C0C0C0] text-black"
          style={{
            border: '2px solid',
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            fontSize: '12px'
          }}
        >
          📝 New Mail
        </button>
        <button 
          className="mr-1 px-2 py-1 bg-[#C0C0C0] text-black"
          style={{
            border: '2px solid',
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            fontSize: '12px'
          }}
        >
          📤 Send
        </button>
        <button 
          className="px-2 py-1 bg-[#C0C0C0] text-black"
          style={{
            border: '2px solid',
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            fontSize: '12px'
          }}
        >
          🗑️ Delete
        </button>
      </div>

      {}
      <div 
        className="flex bg-white"
        style={{
          border: '2px solid',
          borderColor: '#808080 #FFFFFF #FFFFFF #808080'
        }}
      >
        {/* Email*/}
        <div 
          className="w-1/3 border-r border-gray-300"
          style={{
            backgroundColor: '#C0C0C0'
          }}
        >
          {emails.map(email => (
            <div 
              key={email.id} 
              className={`p-1 border-b cursor-pointer ${!email.read ? 'font-bold' : ''}`}
              onClick={() => setSelectedEmail(email)}
              style={{
                backgroundColor: '#C0C0C0',
                border: '1px solid',
                borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
                fontSize: '12px'
              }}
            >
              <div className="flex justify-between">
                <span>{email.from}</span>
                <span>{formatDate(email.date)}</span>
              </div>
              <div>{email.subject}</div>
            </div>
          ))}
        </div>

        {/* Email*/}
        <div 
          className="w-2/3 p-2"
          style={{
            backgroundColor: '#FFFFFF',
            fontSize: '12px'
          }}
        >
          {selectedEmail ? (
            <div>
              <div className="mb-2">
                <div 
                  className="bg-[#000080] text-white p-1 mb-1"
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  📧 Message
                </div>
                <div className="mb-2">
                  <strong>From:</strong> {selectedEmail.from}<br />
                  <strong>Subject:</strong> {selectedEmail.subject}<br />
                  <strong>Date:</strong> {formatDate(selectedEmail.date)}
                </div>
              </div>
              <pre 
                className="whitespace-pre-wrap"
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '12px'
                }}
              >
                {selectedEmail.body}
              </pre>
            </div>
          ) : (
            <div 
              className="text-center text-gray-600"
              style={{
                fontSize: '12px'
              }}
            >
              Select an email to read
            </div>
          )}
        </div>
      </div>

      {}
      <div 
        className="bg-[#C0C0C0] p-1 mt-2"
        style={{
          border: '1px solid',
          borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
          fontSize: '12px'
        }}
      >
        Ready | 2 messages | Connected to AOL
      </div>
    </div>
  );
};

export default RetroEmailApp;