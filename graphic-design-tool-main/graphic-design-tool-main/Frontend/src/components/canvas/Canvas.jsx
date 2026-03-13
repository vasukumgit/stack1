import { useRef, useEffect, useState } from 'react';

const Canvas = ({ 
  tool, 
  color, 
  lineWidth, 
  onDrawStart, 
  onDrawEnd 
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    // Set default styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    setLastX(x);
    setLastY(y);
    
    if (onDrawStart) {
      onDrawStart();
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    if (tool === 'pen') {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (onDrawEnd) {
        onDrawEnd();
      }
    }
  };



  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        className="design-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Canvas;
