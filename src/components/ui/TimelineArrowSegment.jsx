'use client';

export function TimelineArrowSegment({ year, title, description, color = 'yellow', showConnector = true }) {
  const bgColor = color === 'yellow' ? 'bg-[#ffc629]' : 'bg-red-600 text-white';

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Arrow-shaped segment */}
      <div
        className={`${bgColor} h-16 w-full flex items-center justify-center`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 50%, calc(100% - 25px) 100%, 0 100%, 25px 50%)',
        }}
      >
        {/* Year text - bold black */}
        <span className="text-2xl font-bold z-10">{year}</span>
      </div>

      {/* Vertical connector line below left-center point */}
      {showConnector && (
        <div className="border-l-2 relative h-full min-h-60 ml-4 pl-2 pt-3 leading-tight pb-6 box-border after:content-[''] after:absolute after:-left-2 after:bottom-0 after:p-2 after:bg-black after:rounded-full font-medium">
          <h5 className="font-bold">{title}</h5>
          <p className="text-ellipsis text-wrap line-clamp-[9]">{description}</p>
        </div>
      )}
    </div>
  );
}
