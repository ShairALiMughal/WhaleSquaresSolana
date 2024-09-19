import React, { useRef, useEffect, useCallback } from 'react';

const CircularAnglePicker = ({ angle, setAngle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw angle line
    const angleRad = (angle - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angleRad), centerY + radius * Math.sin(angleRad));
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw handle
    ctx.beginPath();
    ctx.arc(centerX + radius * Math.cos(angleRad), centerY + radius * Math.sin(angleRad), 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
  }, [angle]);

  const handleMouseDown = useCallback((e) => {
    const updateAngle = (clientX, clientY) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      setAngle(Math.round(angle));
    };

    const handleMouseMove = (e) => {
      updateAngle(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    updateAngle(e.clientX, e.clientY);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [setAngle]);

  return (
    <div className="w-32 h-32 mx-auto">
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        onMouseDown={handleMouseDown}
        className="cursor-pointer"
      />
    </div>
  );
};

export default CircularAnglePicker;
