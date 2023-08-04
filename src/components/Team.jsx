import React from "react";
import { useDrag, useDrop } from "react-dnd";

const Team = ({ title, teamMates, index, onItemClicked }) => {
  const [, drop] = useDrop(() => ({
    accept: "teammate",
    drop: (item) => {
      onItemClicked(item.teamMate, index);
    },
  }));

  const teamMateElements = teamMates.map((teamMate, mateIndex) => {
    return (
      <TeamMate
        key={mateIndex}
        teamMate={teamMate}
        index={mateIndex}
        teamIndex={index}
      />
    );
  });

  return (
    <div ref={drop} className='bg-purple-200 rounded shadow p-6'>
      <h2 className='font-bold text-xl mb-6'>
        {title}{" "}
        <span className='text-lg font-medium text-purple-600'>
          ({teamMates.length && teamMates.length})
        </span>{" "}
      </h2>
      {teamMates && teamMates.length > 0 ? (
        <div className='flex items-center justify-start gap-2 mb-2 flex-wrap'>
          {teamMateElements}
        </div>
      ) : (
        <p>Equipe Vide</p>
      )}
    </div>
  );
};

const TeamMate = ({ teamMate, teamIndex }) => {
  const [, drag] = useDrag(() => ({
    type: "teammate",
    item: { teamMate: teamMate },
  }));

  return (
    <p
      ref={drag}
      className='text-md px-2 py-2 mt-1 border rounded border-gray-400 cursor-grap'
      draggable='true' // Indicate that the element can be dragged
    >
      {teamMate}
    </p>
  );
};

export default Team;
