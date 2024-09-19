import React, { useState } from 'react';

const TeamSelect = ({ value, onChange, teams, vertical = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`team-select ${vertical ? 'vertical' : ''}`}>
      <div 
        className="selected-team-display" 
        style={{ backgroundColor: value.color }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={value.logo} alt={`${value.name} logo`} className="team-logo" />
        <span className="team-name">{value.name}</span>
      </div>
      {isOpen && (
        <div className="team-dropdown">
          {teams.map((team) => (
            <div 
              key={team.name} 
              className="team-option"
              style={{ backgroundColor: team.color }}
              onClick={() => {
                onChange(team);
                setIsOpen(false);
              }}
            >
              <img src={team.logo} alt={`${team.name} logo`} className="team-logo" />
              <span className="team-name">{team.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelect;
