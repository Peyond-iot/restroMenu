import React, { useState } from 'react';

type SpicyLevel = 'low' | 'medium' | 'high';

interface SpicyPreferenceProps {
  onChange: (level: SpicyLevel) => void;
  selectedLevel: SpicyLevel;
}

const SpicyPreference: React.FC<SpicyPreferenceProps> = ({ onChange, selectedLevel }) => {
  const levels = [
    { level: 'low', count: 1, color: '#FECACA' },
    { level: 'medium', count: 2, color: '#F87171' },
    { level: 'high', count: 3, color: '#EF4444' },
  ];

  const renderChilies = (count: number, fillColor: string) => {
    return Array.from({ length: count }).map((_, index) => (
      <svg
        key={index}
        className="w-6 h-6"
        viewBox="0 0 196.223 196.223"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor}
      >
        <path d="M24.424,161.526c-6.201,4.333-9.038,13.582-6.606,21.726c2.426,8.12,9.365,12.969,18.562,12.971c0.002,0,0.003,0,0.003,0 c1.021,0,2.085-0.061,3.162-0.179c34.288-3.762,66.186-17.956,92.246-41.047c24.197-21.44,40.785-48.461,46.713-76.094 c2.908-13.638-2.508-25.729-15.25-34.067c-1.13-0.803-6.091-4.151-13.232-6.646l21.485-25.901 c2.645-3.188,2.204-7.916-0.984-10.561c-3.186-2.643-7.915-2.205-10.561,0.984l-26.755,32.254 c-4.117-0.411-8.234-0.504-12.203-0.267c-38.45,2.337-42.595,22.203-47.393,45.205C68.906,102.472,63.051,130.546,24.424,161.526z M88.296,82.968c4.434-21.253,6.416-30.675,29.711-32.981l-6.933,6.575c-3.006,2.851-3.131,7.598-0.281,10.603 c1.476,1.555,3.458,2.339,5.443,2.339c1.854,0,3.711-0.683,5.16-2.059l3.616-3.43l-1.185,6.704 c-0.721,4.079,2.002,7.97,6.081,8.691c0.441,0.078,0.88,0.115,1.313,0.115c3.57,0,6.734-2.559,7.377-6.196l0.942-5.34l2.72,5.966 c1.26,2.761,3.982,4.391,6.83,4.391c1.04,0,2.098-0.218,3.106-0.678c3.77-1.719,5.431-6.167,3.713-9.936l-6.12-13.421 c2.931,1.436,4.729,2.719,4.754,2.738c0.127,0.093,0.256,0.183,0.388,0.269c11.276,7.316,9.489,15.702,8.903,18.448 c-9.749,45.451-57.196,97.826-125.927,105.368c-0.536,0.059-1.049,0.089-1.525,0.089h-0.001c-3.366-0.001-3.867-1.356-4.107-2.009 c-0.816-2.212,0.146-4.88,0.725-5.382c0.197-0.129,0.387-0.267,0.57-0.413C76.609,138.998,83.365,106.614,88.296,82.968z" />
      </svg>
    ));
  };

  return (
    <div className="flex flex-col">
      <div className="text-red-600 mb-4">Spicy Preference</div>
      <div className="flex flex-row gap-3 justify-between">
        {levels.map(({ level, count, color }) => (
          <button
            key={level}
            onClick={() => onChange(level as SpicyLevel)}
            className="flex flex-col items-center space-y-1 p-2 rounded-md"
          >
            <div className="flex">{renderChilies(count, selectedLevel === level ? color : 'gray')}</div>
            <p
              className={`text-sm ${
                selectedLevel === level ? 'font-bold text-red-500' : 'text-gray-400'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpicyPreference;
