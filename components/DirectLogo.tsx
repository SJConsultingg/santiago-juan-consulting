'use client';

export default function DirectLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Imagen directa sin optimización */}
      <img
        src="https://santiagojuan.consulting/logo_original.png"
        alt="Santiago Juan Consulting"
        width={40}
        height={40}
        style={{ width: '40px', height: '40px' }}
      />
      <div className="flex flex-col">
        <span className="text-base font-bold text-secondary tracking-tight">
          Santiago Juan
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wider">
          CONSULTING
        </span>
      </div>
    </div>
  );
} 