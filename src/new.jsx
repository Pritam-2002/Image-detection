// src/App.js

import React, { useState, useEffect, useRef } from 'react';

const ImageRectangles = ({ imageUrl }) => {

  const [rectangles, setRectangles] = useState([]);
  const imageRef = useRef(null);
  const cvRef = useRef(null);

  useEffect(() => {
    const detectRectangles = () => {
      if (!cvRef.current) {
        console.error('OpenCV not initialized');
        return;

      }
      console.log("opencv initialize")

      const src = cvRef.current.imread(imageRef.current);
      console.log("src",src)
      const gray = new cvRef.current.Mat();
      console.log("gray",gray)
      const dst = new cvRef.current.Mat();
      console.log("dst",dst)
      const contours = new cvRef.current.MatVector();
      console.log("contours",contours)
      const hierarchy = new cvRef.current.Mat();
      console.log("hieracrchy",hierarchy)

      cvRef.current.cvtColor(src, gray, cvRef.current.COLOR_RGBA2GRAY);
      cvRef.current.Canny(gray, dst, 50, 100, 3, false);
      cvRef.current.findContours(
        dst,
        contours,
        hierarchy,
        cvRef.current.RETR_EXTERNAL,
        cvRef.current.CHAIN_APPROX_SIMPLE
      );

      const boundRect = [];
      for (let i = 0; i < contours.size(); ++i) {
        const cnt = contours.get(i);
        const rect = cvRef.current.boundingRect(cnt);
        boundRect.push(rect);
      }

      setRectangles(boundRect);

      // Clean up
      src.delete();
      gray.delete();
      dst.delete();
      contours.delete();
      hierarchy.delete();
    };

    // Load OpenCV.js asynchronously
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/master/opencv.js';
    script.onload = () => {
      cvRef.current = window.cv;
      detectRectangles();
    };
    document.head.appendChild(script);

    return () => {
      // Remove the script when the component is unmounted
      document.head.removeChild(script);
    };
  }, [imageUrl]);

  return (
    <div style={{ position: 'relative' }}>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Processed"
        onLoad={() => cvRef.current && cvRef.current.imread(imageRef.current)}
      />
      {rectangles.map((rect, index) => (
        <div
          key={index}
          style={{
            border: '2px solid red',
            position: 'absolute',
            left: `${rect.x}px`,
            top: `${rect.y}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  // Replace 'your-image-url.jpg' with the actual image URL
  const imageUrl = 'https://imgs.search.brave.com/Q4ot-TLikHZivRVu4QwWzomdZnyhOtpvtYtKy-w5uvc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdXBw/b3J0LmNvbnRlbnQu/b2ZmaWNlLm5ldC9l/bi11cy9tZWRpYS9k/NWNhNTkwYy0zNTE2/LTQzMWEtOTQwZC0z/ZWI3ZGUzODIyYzYu/cG5n';

  return (
    <div className="App">
      <h1>Hello OpenCV in React</h1>
      <ImageRectangles imageUrl={imageUrl} />
    </div>
  );
};

export default App;
