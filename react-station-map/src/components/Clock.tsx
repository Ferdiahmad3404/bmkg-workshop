import { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update waktu setiap detik
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval saat component unmount
    return () => clearInterval(timer);
  }, []);

  // Format waktu dalam bahasa Indonesia
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Format tanggal dalam bahasa Indonesia
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-end text-right">
      <div className="text-lg font-semibold text-white">
        {formatTime(currentTime)}
      </div>
      <div className="text-sm text-blue-200">
        {formatDate(currentTime)}
      </div>
    </div>
  );
};

export default Clock;