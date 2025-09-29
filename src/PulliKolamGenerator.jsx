import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PulliKolamGenerator = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [dots, setDots] = useState([]);
  const [patternType, setPatternType] = useState('square');
  const [lineThickness, setLineThickness] = useState(3);
  const [dotSize, setDotSize] = useState(5);
  const [coordinatesInput, setCoordinatesInput] = useState('');
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });
  const [isMobile, setIsMobile] = useState(false);
  
  const [dotLayout, setDotLayout] = useState('5x5');
  const [customRows, setCustomRows] = useState(5);
  const [customCols, setCustomCols] = useState(5);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const dotLayouts = [
    { value: '3x3', label: '3x3 Grid (9 dots)', rows: 3, cols: 3 },
    { value: '4x4', label: '4x4 Grid (16 dots)', rows: 4, cols: 4 },
    { value: '5x5', label: '5x5 Grid (25 dots)', rows: 5, cols: 5 },
    { value: '6x6', label: '6x6 Grid (36 dots)', rows: 6, cols: 6 },
    { value: 'circle8', label: 'Circle (8 dots)', type: 'circle', count: 8 },
    { value: 'circle12', label: 'Circle (12 dots)', type: 'circle', count: 12 },
    { value: 'triangle', label: 'Triangle (10 dots)', type: 'triangle', rows: 4 },
    { value: 'custom', label: 'Custom Grid', type: 'custom' }
  ];

  // Initialize
  useEffect(() => {
    checkScreenSize();
    generateDotLayout('5x5');
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const checkScreenSize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setCanvasSize({
      width: mobile ? Math.min(350, window.innerWidth - 40) : 600,
      height: mobile ? Math.min(350, window.innerWidth - 40) : 600
    });
  };

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  };

  const drawDots = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#d6336c';
    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotSize, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const placeDot = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    
    setDots(prev => [...prev, { x, y }]);
  };

  const generateDotLayout = (layoutValue) => {
    setDotLayout(layoutValue);
    const layout = dotLayouts.find(l => l.value === layoutValue);
    
    if (!layout) return;
    
    let newDots = [];
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;
    const margin = isMobile ? 40 : 80;

    if (layout.type === 'circle') {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const radius = Math.min(canvasWidth, canvasHeight) / 2 - margin;
      
      for (let i = 0; i < layout.count; i++) {
        const angle = (i / layout.count) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        newDots.push({ x, y });
      }
    } else if (layout.type === 'triangle') {
      const baseY = canvasHeight - margin;
      const peakY = margin;
      const baseWidth = canvasWidth - 2 * margin;
      
      for (let row = 0; row < layout.rows; row++) {
        const dotsInRow = row + 1;
        const y = baseY - (row / (layout.rows - 1)) * (baseY - peakY);
        const startX = (canvasWidth - (dotsInRow - 1) * (baseWidth / (layout.rows - 1))) / 2;
        
        for (let col = 0; col < dotsInRow; col++) {
          const x = startX + col * (baseWidth / (layout.rows - 1));
          newDots.push({ x, y });
        }
      }
    } else if (layout.value === 'custom') {
      setShowCustomInput(true);
      return;
    } else {
      const rows = layout.rows;
      const cols = layout.cols;
      const spacingX = (canvasWidth - 2 * margin) / (cols - 1);
      const spacingY = (canvasHeight - 2 * margin) / (rows - 1);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newDots.push({
            x: margin + col * spacingX,
            y: margin + row * spacingY
          });
        }
      }
    }
    
    setDots(newDots);
    setShowCustomInput(false);
  };

  const generateCustomGrid = () => {
    const rows = customRows;
    const cols = customCols;
    const margin = isMobile ? 40 : 80;
    const spacingX = (canvasSize.width - 2 * margin) / (cols - 1);
    const spacingY = (canvasSize.height - 2 * margin) / (rows - 1);
    
    const newDots = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newDots.push({
          x: margin + col * spacingX,
          y: margin + row * spacingY
        });
      }
    }
    
    setDots(newDots);
  };

  const loadCoordinates = () => {
    if (!coordinatesInput.trim()) {
      alert('Please enter coordinates in the format: x1,y1; x2,y2; ...');
      return;
    }
    
    const newDots = [];
    const coordPairs = coordinatesInput.split(';');
    
    coordPairs.forEach(pair => {
      const trimmedPair = pair.trim();
      if (trimmedPair) {
        const [x, y] = trimmedPair.split(',').map(coord => parseFloat(coord.trim()));
        if (!isNaN(x) && !isNaN(y)) {
          newDots.push({ x, y });
        }
      }
    });
    
    if (newDots.length > 0) {
      setDots(newDots);
    } else {
      alert('No valid coordinates found. Please use format: x1,y1; x2,y2; ...');
    }
  };

  const clearDots = () => {
    setDots([]);
  };

  const clearKolam = () => {
    drawDots();
  };

  const resetAll = () => {
    setDots([]);
    setCoordinatesInput('');
    const ctx = getCanvasContext();
    if (ctx) {
      const canvas = canvasRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const generateKolam = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    drawDots();
    
    ctx.strokeStyle = '#d6336c';
    ctx.lineWidth = lineThickness;
    ctx.lineCap = 'round';
    
    switch(patternType) {
      case 'square':
        drawSquarePattern(ctx);
        break;
      case 'circular':
        drawCircularPattern(ctx);
        break;
      case 'diagonal':
        drawDiagonalPattern(ctx);
        break;
      case 'spiral':
        drawSpiralPattern(ctx);
        break;
      case 'custom':
        drawCustomPattern(ctx);
        break;
      default:
        break;
    }
  };

  const drawSquarePattern = (ctx) => {
    if (dots.length < 4) return;
    
    ctx.beginPath();
    for (let i = 0; i < dots.length - 1; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = Math.abs(dots[i].x - dots[j].x);
        const dy = Math.abs(dots[i].y - dots[j].y);
        
        const threshold = isMobile ? 25 : 50;
        if ((dx < threshold && dy < 10) || (dy < threshold && dx < 10)) {
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
        }
      }
    }
    ctx.stroke();
    
    ctx.beginPath();
    for (let i = 0; i < dots.length - 1; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = Math.abs(dots[i].x - dots[j].x);
        const dy = Math.abs(dots[i].y - dots[j].y);
        
        if (Math.abs(dx - dy) < 10 && dx > (isMobile ? 15 : 30)) {
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
        }
      }
    }
    ctx.stroke();
  };

  const drawCircularPattern = (ctx) => {
    if (dots.length < 3) return;
    
    const center = findCenter();
    if (!center) return;
    
    const sortedDots = [...dots].sort((a, b) => {
      const angleA = Math.atan2(a.y - center.y, a.x - center.x);
      const angleB = Math.atan2(b.y - center.y, b.x - center.x);
      return angleA - angleB;
    });
    
    ctx.beginPath();
    for (let i = 0; i < sortedDots.length; i++) {
      const next = (i + 1) % sortedDots.length;
      ctx.moveTo(sortedDots[i].x, sortedDots[i].y);
      ctx.lineTo(sortedDots[next].x, sortedDots[next].y);
    }
    ctx.stroke();
    
    ctx.beginPath();
    sortedDots.forEach(dot => {
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(dot.x, dot.y);
    });
    ctx.stroke();
  };

  const drawDiagonalPattern = (ctx) => {
    ctx.beginPath();
    for (let i = 0; i < dots.length - 1; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        if ((i + j) % 2 === 0) {
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
        }
      }
    }
    ctx.stroke();
  };

  const drawSpiralPattern = (ctx) => {
    if (dots.length < 3) return;
    
    const center = findCenter();
    if (!center) return;
    
    const sortedDots = [...dots].sort((a, b) => {
      const distA = Math.sqrt((a.x - center.x) ** 2 + (a.y - center.y) ** 2);
      const distB = Math.sqrt((b.x - center.x) ** 2 + (b.y - center.y) ** 2);
      return distA - distB;
    });
    
    ctx.beginPath();
    for (let i = 0; i < sortedDots.length - 1; i++) {
      ctx.moveTo(sortedDots[i].x, sortedDots[i].y);
      ctx.lineTo(sortedDots[i + 1].x, sortedDots[i + 1].y);
    }
    ctx.stroke();
  };

  const drawCustomPattern = (ctx) => {
    ctx.beginPath();
    for (let i = 0; i < dots.length - 1; i += 2) {
      ctx.moveTo(dots[i].x, dots[i].y);
      ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
    }
    ctx.stroke();
  };

  const findCenter = () => {
    if (dots.length === 0) return null;
    
    const sumX = dots.reduce((sum, dot) => sum + dot.x, 0);
    const sumY = dots.reduce((sum, dot) => sum + dot.y, 0);
    
    return {
      x: sumX / dots.length,
      y: sumY / dots.length
    };
  };

  const downloadKolam = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    const scale = 2;
    tempCanvas.width = canvas.width * scale;
    tempCanvas.height = canvas.height * scale;
    
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    tempCtx.scale(scale, scale);
    tempCtx.drawImage(canvas, 0, 0);
    
    const link = document.createElement('a');
    link.download = `kolam-design-${new Date().getTime()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const downloadSVG = () => {
    const width = canvasSize.width;
    const height = canvasSize.height;
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="100%" height="100%" fill="white"/>`;
    
    dots.forEach(dot => {
      svg += `<circle cx="${dot.x}" cy="${dot.y}" r="${dotSize}" fill="#d6336c"/>`;
    });
    
    svg += `</svg>`;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `kolam-design-${new Date().getTime()}.svg`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const shareKolam = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      if (navigator.share) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'kolam-design.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'My Kolam Design',
          files: [file],
        });
      } else {
        downloadKolam();
      }
    } catch (error) {
      downloadKolam();
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  // Inline CSS with improved responsiveness
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '0',
      background: 'linear-gradient(135deg, #fff0d9 0%, #ffeef2 50%, #fff9d6 100%)',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    },
    header: {
      textAlign: 'center',
      color: '#d6336c',
      marginBottom: '20px',
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      textShadow: '2px 2px 4px rgba(214, 51, 108, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    },
    homeButton: {
      padding: '10px 20px',
      background: '#d6336c',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      boxShadow: '0 2px 5px rgba(214, 51, 108, 0.3)',
      transition: 'all 0.3s ease'
    },
    mainContainer: {
      display: 'flex',
      gap: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(214, 51, 108, 0.1)',
      flexWrap: 'wrap',
      boxSizing: 'border-box'
    },
    controls: {
      flex: '1',
      minWidth: isMobile ? '100%' : '300px',
      maxWidth: isMobile ? '100%' : '400px'
    },
    canvasWrapper: {
      flex: '2',
      minWidth: isMobile ? '100%' : '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px'
    },
    canvasContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    canvas: {
      border: '2px solid #d6336c',
      borderRadius: '10px',
      cursor: 'crosshair',
      background: 'white',
      boxShadow: '0 4px 15px rgba(214, 51, 108, 0.2)',
      maxWidth: '100%',
      height: 'auto',
      display: 'block'
    },
    dotCounter: {
      marginTop: '10px',
      background: '#d6336c',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.9em',
      fontWeight: 'bold',
      boxShadow: '0 2px 8px rgba(214, 51, 108, 0.3)',
      textAlign: 'center'
    },
    controlGroup: {
      margin: '15px 0',
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '10px',
      borderLeft: '4px solid #d6336c'
    },
    controlTitle: {
      color: '#d6336c',
      marginTop: 0,
      marginBottom: '12px',
      fontSize: '1.1em',
      fontWeight: 'bold'
    },
    button: {
      padding: '10px 15px',
      margin: '4px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '8px',
      background: '#d6336c',
      color: 'white',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(214, 51, 108, 0.3)',
      fontSize: '14px',
      flex: '1',
      minWidth: '120px'
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
      margin: '10px 0'
    },
    primaryButton: {
      background: '#d6336c',
      border: '2px solid #d6336c'
    },
    downloadButton: {
      background: '#28a745',
      fontSize: '13px'
    },
    shareButton: {
      background: '#17a2b8',
      fontSize: '13px'
    },
    select: {
      padding: '10px',
      margin: '5px 0',
      border: '2px solid #d6336c',
      borderRadius: '8px',
      width: '100%',
      background: 'white',
      color: '#333',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    slider: {
      width: '100%',
      margin: '8px 0',
      accentColor: '#d6336c'
    },
    label: {
      display: 'block',
      margin: '8px 0 4px 0',
      color: '#d6336c',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    coordinates: {
      marginTop: '8px',
      fontSize: '12px',
      maxHeight: '120px',
      overflowY: 'auto',
      padding: '8px',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '5px',
      border: '1px solid rgba(214, 51, 108, 0.2)'
    },
    coordInput: {
      width: '100%',
      height: '70px',
      marginTop: '8px',
      padding: '8px',
      border: '2px solid #d6336c',
      borderRadius: '8px',
      resize: 'vertical',
      fontFamily: 'monospace',
      fontSize: '12px',
      boxSizing: 'border-box'
    },
    customGrid: {
      marginTop: '12px',
      padding: '12px',
      background: 'rgba(214, 51, 108, 0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(214, 51, 108, 0.2)'
    },
    inputRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      flexWrap: 'wrap'
    },
    numberInput: {
      padding: '6px',
      border: '2px solid #d6336c',
      borderRadius: '6px',
      width: '60px',
      textAlign: 'center',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    layoutInfo: {
      marginTop: '8px',
      padding: '6px',
      background: 'rgba(214, 51, 108, 0.1)',
      borderRadius: '6px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    downloadButtons: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '6px',
      flexWrap: 'wrap'
    }
  };

  // Add hover effects
  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(214, 51, 108, 0.4)'
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>Kolam Generator</h1>
        <button 
          onClick={goToHome}
          style={styles.homeButton}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, styles.homeButton)}
        >
          🏠 Home
        </button>
      </div>
      
      <div style={styles.mainContainer}>
        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>1. Select Dot Layout</h3>
            <select 
              value={dotLayout} 
              onChange={(e) => generateDotLayout(e.target.value)}
              style={styles.select}
            >
              {dotLayouts.map(layout => (
                <option key={layout.value} value={layout.value}>
                  {layout.label}
                </option>
              ))}
            </select>
            
            {showCustomInput && (
              <div style={styles.customGrid}>
                <h4 style={styles.controlTitle}>Custom Grid Size</h4>
                <div style={styles.inputRow}>
                  <label style={styles.label}>Rows:</label>
                  <input 
                    type="number" 
                    min="2" 
                    max="15" 
                    value={customRows}
                    onChange={(e) => setCustomRows(parseInt(e.target.value) || 2)}
                    style={styles.numberInput}
                  />
                  <label style={styles.label}>Columns:</label>
                  <input 
                    type="number" 
                    min="2" 
                    max="15" 
                    value={customCols}
                    onChange={(e) => setCustomCols(parseInt(e.target.value) || 2)}
                    style={styles.numberInput}
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button 
                    onClick={generateCustomGrid} 
                    style={{...styles.button, ...styles.primaryButton}}
                    onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, {...styles.button, ...styles.primaryButton})}
                  >
                    Generate Custom Grid
                  </button>
                </div>
              </div>
            )}
            
            <div style={styles.layoutInfo}>
              <p style={{ margin: 0 }}>Current: {dots.length} dots</p>
            </div>
          </div>

          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>2. Place Additional Dots</h3>
            <p style={{ margin: '8px 0', fontSize: '14px' }}>Click on canvas to add more dots manually</p>
            <div style={styles.buttonGroup}>
              <button 
                onClick={clearDots} 
                style={styles.button}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
              >
                Clear All Dots
              </button>
            </div>
          </div>
          
          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>3. Kolam Pattern</h3>
            <select 
              value={patternType} 
              onChange={(e) => setPatternType(e.target.value)}
              style={styles.select}
            >
              <option value="square">Square Pattern</option>
              <option value="circular">Circular Pattern</option>
              <option value="diagonal">Diagonal Pattern</option>
              <option value="spiral">Spiral Pattern</option>
              <option value="custom">Custom Connections</option>
            </select>
          </div>
          
          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>4. Thickness & Style</h3>
            <label style={styles.label}>Line Thickness: {lineThickness}</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={lineThickness}
              onChange={(e) => setLineThickness(parseInt(e.target.value))}
              style={styles.slider}
            />
            
            <label style={styles.label}>Dot Size: {dotSize}</label>
            <input 
              type="range" 
              min="2" 
              max="15" 
              value={dotSize}
              onChange={(e) => setDotSize(parseInt(e.target.value))}
              style={styles.slider}
            />
          </div>
          
          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>5. Generate Kolam</h3>
            <div style={styles.buttonGroup}>
              <button 
                onClick={generateKolam} 
                style={{...styles.button, ...styles.primaryButton}}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, {...styles.button, ...styles.primaryButton})}
              >
                Generate Kolam
              </button>
              <button 
                onClick={clearKolam} 
                style={styles.button}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
              >
                Clear Lines
              </button>
              <button 
                onClick={resetAll} 
                style={styles.button}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
              >
                Reset All
              </button>
            </div>
          </div>

          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>6. Download & Share</h3>
            <div style={styles.downloadButtons}>
              <button 
                onClick={downloadKolam} 
                style={{...styles.button, ...styles.downloadButton}}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, {...styles.button, ...styles.downloadButton})}
              >
                📥 Download PNG
              </button>
              <button 
                onClick={downloadSVG} 
                style={{...styles.button, ...styles.downloadButton}}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, {...styles.button, ...styles.downloadButton})}
              >
                📥 Download SVG
              </button>
              <button 
                onClick={shareKolam} 
                style={{...styles.button, ...styles.shareButton}}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, {...styles.button, ...styles.shareButton})}
              >
                📤 Share
              </button>
            </div>
          </div>
          
          <div style={styles.controlGroup}>
            <h3 style={styles.controlTitle}>Coordinates</h3>
            <div style={styles.coordinates}>
              {dots.map((dot, index) => (
                <div key={index} style={{ margin: '2px 0' }}>
                  Dot {index + 1}: ({Math.round(dot.x)}, {Math.round(dot.y)})
                </div>
              ))}
            </div>
            <textarea 
              value={coordinatesInput}
              onChange={(e) => setCoordinatesInput(e.target.value)}
              placeholder="Enter coordinates: x1,y1; x2,y2; ..." 
              style={styles.coordInput}
            />
            <div style={styles.buttonGroup}>
              <button 
                onClick={loadCoordinates} 
                style={styles.button}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
              >
                Load Coordinates
              </button>
            </div>
          </div>
        </div>
        
        <div style={styles.canvasWrapper}>
          <div style={styles.canvasContainer}>
            <canvas 
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onClick={placeDot}
              style={styles.canvas}
            />
          </div>
          <div style={styles.dotCounter}>
            Total Dots: {dots.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulliKolamGenerator;