import React from "react";

const InitialGroup = ({ initialGroup, onRemove, onClearAll }) => {
  return (
    <>
      <div className='flex items-center justify-between mb-3'>
        <h2 className='text-xl font-bold mb-2'>Groupe de personnes initial:</h2>
        {initialGroup && initialGroup.length > 0 && (
          <button
            className='px-4 py-1.5 bg-purple-500 text-white rounded'
            onClick={onClearAll}>
            Tout effacer
          </button>
        )}
      </div>

      <div className='flex items-center justify-start gap-2 mb-2 flex-wrap'>
        {initialGroup && initialGroup.length > 0 ? (
          initialGroup.map((person, index) => (
            <div
              key={index}
              className='px-3 py-1.5 rounded bg-purple-300 flex items-center gap-2 shadow-md'>
              <p>{person}</p>
              <div
                onClick={() => onRemove(person)}
                className=' cursor-pointer transition duration-300 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className='p-5  w-full border-2 border-dashed rounded border-purple-800 border-spacing-1 bg-purple-200'>
            Add a person to start...
          </div>
        )}
      </div>
    </>
  );
};

export default InitialGroup;
