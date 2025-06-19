'use client';

interface BasicLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export default function BasicLogo({
  width = 40,
  height = 40,
  className = '',
  showText = true,
  textColor = 'text-secondary'
}: BasicLogoProps) {
  // Usar una ruta absoluta para asegurar que el logo se cargue correctamente
  const logoPath = process.env.NODE_ENV === 'production' 
    ? 'https://santiagojuan.consulting/logo_original.png' 
    : '/logo_original.png';

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <img
        src={logoPath}
        alt="Santiago Juan Consulting"
        width={width}
        height={height}
        className="relative z-10"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
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