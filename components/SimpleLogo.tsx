'use client';

interface SimpleLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  variant?: 'original' | 'blanco';
}

export default function SimpleLogo({
  width = 40,
  height = 40,
  className = '',
  showText = true,
  textColor = 'text-secondary',
  variant = 'original'
}: SimpleLogoProps) {
  // Elegir el logo según la variante
  const logoSrc = variant === 'blanco' ? '/logo_blanco.png' : '/logo_original.png';

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <img
        src={logoSrc}
        alt="Santiago Juan Consulting"
        width={width}
        height={height}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="relative z-10"
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`text-base md:text-lg font-bold ${textColor} tracking-tight`}>
            Santiago Juan
          </span>
          <span className={`text-xs md:text-sm ${variant === 'blanco' ? 'text-gray-300' : 'text-gray-500'} font-medium tracking-wider`}>
            CONSULTING
          </span>
        </div>
      )}
    </div>
  );
} 