'use client';

export default function EmergencyLogo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo_original.png"
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