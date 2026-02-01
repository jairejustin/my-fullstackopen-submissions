import { useEffect } from 'react';

const Message = ({ messageObject, onClose }) => {
  const { type, content } = messageObject;

  useEffect(() => {
    // only set the timer if there is an active message
    if (!type) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [type, onClose]);

  // just checking if there is no message
  if (!type) return null;

  const messageStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: '#eee',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return (
    <div style={messageStyle}>
      {content}
    </div>
  );
};

export default Message;