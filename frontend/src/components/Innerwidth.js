import React, { useState, useEffect } from 'react'

export default function InnerWidth() {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    localStorage.setItem("w", screenSize.dynamicWidth);
    localStorage.setItem("h", screenSize.dynamicHeight);
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
  return (
    <div>
      <ul>
        <li>Width: <strong>{screenSize.dynamicWidth}</strong></li>
        <li>Height: <strong>{screenSize.dynamicHeight}</strong></li>
      </ul>    
    </div>
  )
}