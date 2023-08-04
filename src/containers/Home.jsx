import React, { useState, useEffect } from "react";
import { useTeams } from "../context/TeamsContext";
import InitialGroup from "../components/InitialGroup";
import Team from "../components/Team";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const HomePage = () => {
  const { actions, initialGroup, teams, numberOfTeams } = useTeams();
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddPeople = () => {
    const people = inputValue.split(/\n|;/).map((person) => person.trim());
    actions.addMultiplePersonsToInitialGroup(people);
    setInputValue("");
  };

  return (
    <DndProvider key={teams} backend={HTML5Backend}>
      <div className='container mx-auto p-4'>
        <div className='flex mb-4'>
          <textarea
            type='text'
            placeholder='Ajouter des personnes séparées par des retours à la ligne ou des points-virgules...'
            className='flex-grow p-2 border rounded mr-2'
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className='px-4 py-2 bg-green-500 text-white rounded'
            onClick={handleAddPeople}>
            Ajouter
          </button>
        </div>

        <div className='mb-10'>
          <InitialGroup
            initialGroup={initialGroup}
            onRemove={actions.removePersonFromInitialGroup}
            onClearAll={actions.reset}
          />
        </div>

        <div className='mb-4'>
          <span className='mr-2'>Nombre d'équipes:</span>
          <input
            type='number'
            className='p-2 border rounded'
            value={numberOfTeams}
            onChange={(e) => actions.setNumberOfTeams(Number(e.target.value))}
          />
          <button
            className='px-4 py-2 bg-green-500 text-white rounded mx-3'
            onClick={() => actions.createRandomTeams()}>
            Shuffle
          </button>
        </div>

        <div className='mt-4'>
          <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {teams?.map((team, index) => (
              <Team
                key={index}
                teamMates={team}
                title={"Équipe " + (index + 1)}
                index={index}
                onItemClicked={actions.modifyTeamsForPerson}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default HomePage;
