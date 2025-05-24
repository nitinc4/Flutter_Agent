import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface ResizableProps {
  children: ReactNode;
  direction: 'horizontal' | 'vertical';
  defaultSize: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export const Resizable: React.FC<ResizableProps> = ({
  children,
  direction,
  defaultSize,
  minSize = 10,
  maxSize = 90,
  className = ''
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);
  const resizableRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
    startSizeRef.current = size;
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      const delta = currentPos - startPosRef.current;
      
      let parentSize = 0;
      if (resizableRef.current) {
        const parentElement = resizableRef.current.parentElement;
        if (parentElement) {
          parentSize = direction === 'horizontal' 
            ? parentElement.getBoundingClientRect().width 
            : parentElement.getBoundingClientRect().height;
        }
      }
      
      if (parentSize === 0) return;
      
      const deltaPercent = (delta / parentSize) * 100;
      let newSize = startSizeRef.current + deltaPercent;
      
      // Enforce min/max constraints
      newSize = Math.max(minSize, Math.min(maxSize, newSize));
      
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, direction, minSize, maxSize]);

  const resizeHandleStyles = direction === 'horizontal'
    ? 'w-1 cursor-col-resize hover:bg-blue-500 active:bg-blue-600'
    : 'h-1 cursor-row-resize hover:bg-blue-500 active:bg-blue-600';

  return (
    <div 
      ref={resizableRef}
      style={{ 
        [direction === 'horizontal' ? 'width' : 'height']: `${size}%`,
      }}
      className={`${className} relative`}
    >
      {children}
      <div 
        className={`absolute ${resizeHandleStyles} ${direction === 'horizontal' ? 'right-0 top-0 bottom-0' : 'bottom-0 left-0 right-0'} bg-gray-300 dark:bg-gray-700 transition-colors duration-150 z-10`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};