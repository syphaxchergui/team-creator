import React, { useState, useEffect } from "react";

const initialState = {
  initialGroup: [],
  numberOfTeams: 2,
  teams: [],
};

const teamsContext = React.createContext(initialState);

export const TeamsProvider = ({ children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!state) {
      const savedState = localStorage.getItem("teamsState");
      setState(savedState ? JSON.parse(savedState) : initialState);
    }
  }, []);

  useEffect(() => {
    // Only save the state when it changes to avoid excessive writes to localStorage
    if (state) {
      localStorage.setItem("teamsState", JSON.stringify(state));
    }
  }, [state]);

  const reset = () => {
    setState(initialState);
  };

  // Function to set the number of teams
  const setNumberOfTeams = (number) => {
    setState({ ...state, numberOfTeams: number });
  };

  // Function to add a person to the initial group
  const addPersonToInitialGroup = (person) => {
    setState((prevState) => ({
      ...prevState,
      initialGroup: [...prevState.initialGroup, person],
    }));
  };

  // Function to remove a person from the initial group and all teams
  const removePersonFromInitialGroup = (person) => {
    setState((prevState) => {
      // Filter out the person from the initial group
      const updatedInitialGroup = prevState.initialGroup.filter(
        (p) => p !== person
      );

      // Check if the person is in any of the teams and remove them
      const updatedTeams = prevState.teams.map((team) =>
        team.filter((p) => p !== person)
      );

      return {
        ...prevState,
        initialGroup: updatedInitialGroup,
        teams: updatedTeams,
      };
    });
  };

  // Function to add multiple persons to the initial group
  const addMultiplePersonsToInitialGroup = (people) => {
    setState((prevState) => ({
      ...prevState,
      initialGroup: [...prevState.initialGroup, ...people],
    }));
  };

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  // Function to create random teams
  const createRandomTeams = () => {
    const { initialGroup, numberOfTeams } = state;

    // Make a copy of the initialGroup and shuffle it randomly
    const shuffledGroup = shuffleArray([...initialGroup]);

    // Calculate the size of each team
    const teamSize = Math.ceil(shuffledGroup.length / numberOfTeams);

    // Split the shuffledGroup into teams
    const teams = Array.from({ length: numberOfTeams }, (_, index) =>
      shuffledGroup.slice(index * teamSize, (index + 1) * teamSize)
    );

    setState((prevState) => ({
      ...prevState,
      teams,
    }));
  };

  // Function to modify teams for each person
  const modifyTeamsForPerson = (person, newTeamIndex) => {
    setState((prevState) => {
      // Check if the person is already in the target team
      const isInTargetTeam = prevState.teams[newTeamIndex].includes(person);

      // If the person is already in the target team, return the previous state
      if (isInTargetTeam) {
        return prevState;
      }

      // Modify the teams as usual
      const updatedTeams = prevState.teams.map((team, index) =>
        index === newTeamIndex
          ? [...team, person]
          : team.filter((p) => p !== person)
      );

      return {
        ...prevState,
        teams: updatedTeams,
      };
    });
  };

  return (
    <teamsContext.Provider
      value={{
        ...state,
        actions: {
          setNumberOfTeams,
          addPersonToInitialGroup,
          removePersonFromInitialGroup,
          addMultiplePersonsToInitialGroup,
          createRandomTeams,
          modifyTeamsForPerson,
          reset,
        },
      }}>
      {children}
    </teamsContext.Provider>
  );
};

export const useTeams = () => React.useContext(teamsContext);
