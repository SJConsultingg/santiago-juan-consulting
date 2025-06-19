'use client';

interface SVGLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export default function SVGLogo({
  width = 40,
  height = 40,
  className = '',
  showText = true,
  textColor = 'text-secondary'
}: SVGLogoProps) {
  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      {/* Logo SVG directamente en el componente */}
      <div 
        style={{ width: `${width}px`, height: `${height}px` }}
        className="relative flex items-center justify-center bg-[#63C3B9] rounded-full"
      >
        <svg
          width={width * 0.6}
          height={height * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 12V8H16C16 8.53043 15.7893 9.03914 15.4142 9.41421C15.0391 9.78929 14.5304 10 14 10H10C9.46957 10 8.96086 9.78929 8.58579 9.41421C8.21071 9.03914 8 8.53043 8 8H4V12H8C8 11.4696 8.21071 10.9609 8.58579 10.5858C8.96086 10.2107 9.46957 10 10 10H14C14.5304 10 15.0391 10.2107 15.4142 10.5858C15.7893 10.9609 16 11.4696 16 12H20Z"
            fill="#000000"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-base md:text-lg font-bold ${textColor} tracking-tight`}>
            Santiago Juan
          </span>
          <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wider">
            CONSULTING
          </span>
        </div>
      )}
    </div>
  );
} 