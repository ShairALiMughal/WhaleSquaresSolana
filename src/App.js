import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
import { Sun, Moon, Wallet } from 'lucide-react';
import './WhaleSquaresOnSolana.css';
// Import all NFL team logos
import arizonaCardinalsLogo from './logos/arizona-cardinals.png';
import atlantaFalconsLogo from './logos/atlanta-falcons.png';
import baltimoreRavensLogo from './logos/baltimore-ravens.png';
import buffaloBillsLogo from './logos/buffalo-bills.png';
import carolinaPanthersLogo from './logos/carolina-panthers.png';
import chicagoBearsLogo from './logos/chicago-bears.png';
import cincinnatiBengalsLogo from './logos/cincinnati-bengals.png';
import clevelandBrownsLogo from './logos/cleveland-browns.png';
import dallasCowboysLogo from './logos/dallas-cowboys.png';
import denverBroncosLogo from './logos/denver-broncos.png';
import detroitLionsLogo from './logos/detroit-lions.png';
import greenBayPackersLogo from './logos/green-bay-packers.png';
import houstonTexansLogo from './logos/houston-texans.png';
import indianapolisColtsLogo from './logos/indianapolis-colts.png';
import jacksonvilleJaguarsLogo from './logos/jacksonville-jaguars.png';
import kansasCityChiefsLogo from './logos/kansas-city-chiefs.png';
import lasVegasRaidersLogo from './logos/las-vegas-raiders.png';
import losAngelesChargersLogo from './logos/los-angeles-chargers.png';
import losAngelesRamsLogo from './logos/los-angeles-rams.png';
import miamiDolphinsLogo from './logos/miami-dolphins.png';
import minnesotaVikingsLogo from './logos/minnesota-vikings.png';
import newEnglandPatriotsLogo from './logos/new-england-patriots.png';
import newOrleansSaintsLogo from './logos/new-orleans-saints.png';
import newYorkGiantsLogo from './logos/new-york-giants.png';
import newYorkJetsLogo from './logos/new-york-jets.png';
import philadelphiaEaglesLogo from './logos/philadelphia-eagles.png';
import pittsburghSteelersLogo from './logos/pittsburgh-steelers.png';
import sanFrancisco49ersLogo from './logos/san-francisco-49ers.png';
import seattleSeahawksLogo from './logos/seattle-seahawks.png';
import tampaBayBuccaneersLogo from './logos/tampa-bay-buccaneers.png';
import tennesseeTitansLogo from './logos/tennessee-titans.png';
import washingtonCommandersLogo from './logos/washington-commanders.png';


const WhaleNFTIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q30 20 50 50 Q70 80 90 50 Q70 70 50 70 Q30 70 10 50 Z" fill="#14F195" stroke="#000000" strokeWidth="3" />
    <circle cx="30" cy="45" r="5" fill="#000000" />
  </svg>
);

// Simplified Button Component
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`px-4 py-2 text-white rounded ${className}`} type="button">
    {children}
  </button>
);

// Custom Input Component
const Input = ({ id, value, onChange, onKeyPress, className }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    className={`border rounded px-3 py-2 ${className}`}
  />
);

// Custom Label Component
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);

const WhaleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q30 20 50 50 Q70 80 90 50 Q70 70 50 70 Q30 70 10 50 Z" fill="#14F195" stroke="#000000" strokeWidth="3" />
    <circle cx="30" cy="45" r="5" fill="#000000" />
  </svg>
);

const NFTCharacter = () => (
  <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FFA500" />
    <circle cx="35" cy="40" r="5" fill="black" />
    <circle cx="65" cy="40" r="5" fill="black" />
    <path d="M 30 70 Q 50 85 70 70" stroke="black" strokeWidth="3" fill="none" />
  </svg>
);

const NFL_TEAMS = [
  { name: 'Arizona Cardinals', logo: arizonaCardinalsLogo, color: '#97233F' },
  { name: 'Atlanta Falcons', logo: atlantaFalconsLogo, color: '#A71930' },
  { name: 'Baltimore Ravens', logo: baltimoreRavensLogo, color: '#241773' },
  { name: 'Buffalo Bills', logo: buffaloBillsLogo, color: '#00338D' },
  { name: 'Carolina Panthers', logo: carolinaPanthersLogo, color: '#0085CA' },
  { name: 'Chicago Bears', logo: chicagoBearsLogo, color: '#0B162A' },
  { name: 'Cincinnati Bengals', logo: cincinnatiBengalsLogo, color: '#FB4F14' },
  { name: 'Cleveland Browns', logo: clevelandBrownsLogo, color: '#FF3C00' },
  { name: 'Dallas Cowboys', logo: dallasCowboysLogo, color: '#003594' },
  { name: 'Denver Broncos', logo: denverBroncosLogo, color: '#FB4F14' },
  { name: 'Detroit Lions', logo: detroitLionsLogo, color: '#0076B6' },
  { name: 'Green Bay Packers', logo: greenBayPackersLogo, color: '#203731' },
  { name: 'Houston Texans', logo: houstonTexansLogo, color: '#03202F' },
  { name: 'Indianapolis Colts', logo: indianapolisColtsLogo, color: '#002C5F' },
  { name: 'Jacksonville Jaguars', logo: jacksonvilleJaguarsLogo, color: '#101820' },
  { name: 'Kansas City Chiefs', logo: kansasCityChiefsLogo, color: '#E31837' },
  { name: 'Las Vegas Raiders', logo: lasVegasRaidersLogo, color: '#000000' },
  { name: 'Los Angeles Chargers', logo: losAngelesChargersLogo, color: '#0080C6' },
  { name: 'Los Angeles Rams', logo: losAngelesRamsLogo, color: '#003594' },
  { name: 'Miami Dolphins', logo: miamiDolphinsLogo, color: '#008E97' },
  { name: 'Minnesota Vikings', logo: minnesotaVikingsLogo, color: '#4F2683' },
  { name: 'New England Patriots', logo: newEnglandPatriotsLogo, color: '#002244' },
  { name: 'New Orleans Saints', logo: newOrleansSaintsLogo, color: '#D3BC8D' },
  { name: 'New York Giants', logo: newYorkGiantsLogo, color: '#0B2265' },
  { name: 'New York Jets', logo: newYorkJetsLogo, color: '#125740' },
  { name: 'Philadelphia Eagles', logo: philadelphiaEaglesLogo, color: '#004C54' },
  { name: 'Pittsburgh Steelers', logo: pittsburghSteelersLogo, color: '#FFB612' },
  { name: 'San Francisco 49ers', logo: sanFrancisco49ersLogo, color: '#AA0000' },
  { name: 'Seattle Seahawks', logo: seattleSeahawksLogo, color: '#002244' },
  { name: 'Tampa Bay Buccaneers', logo: tampaBayBuccaneersLogo, color: '#D50A0A' },
  { name: 'Tennessee Titans', logo: tennesseeTitansLogo, color: '#0C2340' },
  { name: 'Washington Commanders', logo: washingtonCommandersLogo, color: '#5A1414' },
];


const CircularAnglePicker = ({ angle, setAngle }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw angle line
    const angleRad = (angle - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angleRad), centerY + radius * Math.sin(angleRad));
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw handle
    ctx.beginPath();
    ctx.arc(centerX + radius * Math.cos(angleRad), centerY + radius * Math.sin(angleRad), 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
  }, [angle]);

  const handleMouseDown = useCallback((e) => {
    const updateAngle = (clientX, clientY) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      setAngle(Math.round(angle));
    };

    const handleMouseMove = (e) => {
      updateAngle(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    updateAngle(e.clientX, e.clientY);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [setAngle]);

  return (
    <div ref={containerRef} className="w-32 h-32 mx-auto">
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        onMouseDown={handleMouseDown}
        className="cursor-pointer"
      />
    </div>
  );
};


const WhaleSquaresOnSolana = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState({});
  const [team1, setTeam1] = useState(NFL_TEAMS.find(team => team.name === 'Las Vegas Raiders'));
  const [team2, setTeam2] = useState(NFL_TEAMS.find(team => team.name === 'Dallas Cowboys'));
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [rowNumbers, setRowNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [colNumbers, setColNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [winningSquare, setWinningSquare] = useState(null);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [currentSquare, setCurrentSquare] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [showGameRules, setShowGameRules] = useState(false);
  const [textAngle, setTextAngle] = useState(0);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [selectionType, setSelectionType] = useState('name');
  const dialogRef = useRef(null);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsNameDialogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const connectWallet = () => {
    // Implement wallet connection logic here
    setIsWalletConnected(!isWalletConnected);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleSquareClick = (row, col) => {
    setCurrentSquare({ row, col });
    const existingData = selectedSquares[`${row}-${col}`];
    if (existingData) {
      setPlayerName(existingData.name || '');
      setTextAngle(existingData.angle || 0);
      setTextColor(existingData.color || '#FFFFFF');
      setSelectionType(existingData.type || 'name');
    } else {
      setPlayerName('');
      setTextAngle(0);
      setTextColor('#FFFFFF');
      setSelectionType('name');
    }
    setIsNameDialogOpen(true);
  };


  const handleNameSubmit = () => {
    if (selectionType === 'name' && playerName.trim() === '') return;
    
    setSelectedSquares(prev => ({
      ...prev,
      [`${currentSquare.row}-${currentSquare.col}`]: {
        name: selectionType === 'name' ? playerName.trim() : 'Whale NFT',
        angle: textAngle,
        color: textColor,
        type: selectionType
      }
    }));
    setIsNameDialogOpen(false);
    setPlayerName('');
    setTextAngle(0);
    setTextColor('#FFFFFF');
    setSelectionType('name');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const generateRandomScores = () => {
    const newTeam1Score = Math.floor(Math.random() * 10);
    const newTeam2Score = Math.floor(Math.random() * 10);
    setTeam1Score(newTeam1Score);
    setTeam2Score(newTeam2Score);
    setWinningSquare({ row: newTeam2Score, col: newTeam1Score });
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleBoard = () => {
    setRowNumbers(shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    setColNumbers(shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    setSelectedSquares({});
    setTeam1Score(0);
    setTeam2Score(0);
    setWinningSquare(null);
  };

  const renderSquare = useCallback((row, col) => {
    const actualRow = rowNumbers[row];
    const actualCol = colNumbers[col];
    const squareData = selectedSquares[`${actualRow}-${actualCol}`];
    const selectedName = squareData ? squareData.name : null;
    const isWinner = winningSquare && actualRow === winningSquare.row && actualCol === winningSquare.col;
    const isWhaleNFT = squareData && squareData.type === 'whale';
    const squareNumber = row * 10 + col + 1;

    const textStyle = squareData ? {
      transform: `rotate(${squareData.angle}deg)`,
      color: squareData.color
    } : {};

    return (
      <div
        key={`${row}-${col}`}
        className={`border border-black flex flex-col items-center justify-center cursor-pointer text-sm
                    ${isWinner ? 'w-24 h-24 -m-4 z-10 bg-green-400 shadow-lg rounded-lg' : 'w-16 h-16'}
                    ${selectedName ? 'bg-blue-200' : 'bg-white'}`}
        onClick={() => handleSquareClick(actualRow, actualCol)}
      >
        {isWinner ? (
          <>
            <WhaleIcon />
            <span className="text-xs font-bold">WIN!</span>
            <span className="text-xs font-bold truncate w-full text-center" title={selectedName}>
              {selectedName}
            </span>
          </>
        ) : isWhaleNFT ? (
          <WhaleNFTIcon />
        ) : selectedName ? (
          <span 
            className={`text-xs font-bold truncate w-full text-center ${winningSquare ? 'text-gray-500' : ''}`} 
            title={selectedName}
            style={textStyle}
          >
            {selectedName.length > 8 ? `${selectedName.slice(0, 7)}...` : selectedName}
          </span>
        ) : (
          <span className={winningSquare ? 'text-gray-500' : ''}>
            {squareNumber}
          </span>
        )}
      </div>
    );
  }, [selectedSquares, winningSquare, rowNumbers, colNumbers, handleSquareClick]);


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

  const nameNumbersTest = () => {
    const names = [
      "John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava", "Benjamin", "Isabella",
      "Daniel", "Mia", "Ethan", "Charlotte", "Alexander", "Amelia", "Henry", "Harper", "Jacob", "Evelyn",
      "Samuel", "Abigail", "David", "Emily", "Joseph", "Elizabeth", "Matthew", "Sofia", "Liam", "Avery",
      "Jackson", "Ella", "Owen", "Madison", "Sebastian", "Scarlett", "Gabriel", "Victoria", "Carter", "Aria",
      "Jayden", "Grace", "Luke", "Chloe", "Anthony", "Camila", "Isaac", "Penelope", "Grayson", "Riley",
      "Jack", "Layla", "Julian", "Zoey", "Levi", "Nora", "Christopher", "Lily", "Joshua", "Eleanor",
      "Andrew", "Hannah", "Lincoln", "Lillian", "Mateo", "Addison", "Ryan", "Aubrey", "Jaxon", "Ellie",
      "Nathan", "Stella", "Aaron", "Natalie", "Isaiah", "Zoe", "Thomas", "Leah", "Charles", "Hazel",
      "Caleb", "Violet", "Josiah", "Aurora", "Christian", "Savannah", "Hunter", "Audrey", "Eli", "Brooklyn",
      "Jonathan", "Bella", "Connor", "Claire", "Landon", "Skylar", "Adrian", "Lucy", "Asher", "Paisley"
    ];
    const newSelectedSquares = {};
    let availableSquares = Array.from({ length: 100 }, (_, i) => ({ row: Math.floor(i / 10), col: i % 10 }));

    availableSquares = shuffleArray(availableSquares);

    for (let i = 0; i < Math.min(98, availableSquares.length); i++) {
      const { row, col } = availableSquares[i];
      const randomName = names[Math.floor(Math.random() * names.length)];
      newSelectedSquares[`${row}-${col}`] = {
        name: randomName,
        type: 'name'
      };
    }

    setSelectedSquares(newSelectedSquares);
  };

  return (
    <div className={`p-4 ${darkMode ? '' : 'bg-gradient-to-br from-gray-800 to-black'} min-h-screen relative`}>
    <div className="flex justify-between items-center mb-4">
      <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-gray-100' : 'text-white'}`}>Whale Squares on Solana</h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={connectWallet}
          className={`px-4 py-2 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white flex items-center`}
        >
          <Wallet size={18} className="mr-2" />
          {isWalletConnected ? 'Disconnect' : 'Connect Wallet'}
        </button>
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-yellow-400'}`}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
    </div>

    <div className={`game-rules ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} rounded-lg p-4 mb-4`}>
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Game Rules and Prizes</h3>
        <p>Each square costs $25 to enter.</p>
        <p>Prizes per quarter:</p>
        <ul className="list-disc list-inside">
          <li>1st Quarter: $250</li>
          <li>Halftime: $500</li>
          <li>3rd Quarter: $250</li>
          <li>4th Quarter: $1000</li>
        </ul>
        <p className={`mt-2 font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Special Feature: Enter 'NFT' or 'nft' as your name to get a unique character!</p>
      </div>

      <div className={`game-container ${darkMode ? 'bg-gray-800' : 'bg-black'}`}>
      <div className="game-board">
          <div className="horizontal-team-select">
            <TeamSelect value={team1} onChange={setTeam1} teams={NFL_TEAMS} />
            <span className="team-score">{team1Score}</span>
          </div>
          <div className="board-wrapper">
            <div className="vertical-team-select">
              <TeamSelect value={team2} onChange={setTeam2} teams={NFL_TEAMS} vertical={true} />
              <span className="team-score">{team2Score}</span>
            </div>
            <div className="board-grid">
              <div className="board-row">
                <div className="board-cell header-cell"></div>
                {colNumbers.map(col => (
                  <div key={col} className={`board-cell header-cell ${col === team1Score ? 'winner-cell' : ''}`}>
                    {col}
                  </div>
                ))}
              </div>
              {rowNumbers.map((row, rowIndex) => (
                <div key={row} className="board-row">
                  <div className={`board-cell header-cell ${row === team2Score ? 'winner-cell' : ''}`}>
                    {row}
                  </div>
                  {colNumbers.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="game" className="w-full mb-4">
        <TabsList className={darkMode ? 'bg-gray-700' : ''}>
          <TabsTrigger value="game" className={darkMode ? 'text-gray-100' : ''}>Game</TabsTrigger>
          <TabsTrigger value="leaderboard" className={darkMode ? 'text-gray-100' : ''}>Leaderboard</TabsTrigger>
          <TabsTrigger value="history" className={darkMode ? 'text-gray-100' : ''}>History</TabsTrigger>
        </TabsList>
        <TabsContent value="game" className={darkMode ? 'text-gray-100' : ''}>Game content here</TabsContent>
        <TabsContent value="leaderboard" className={darkMode ? 'text-gray-100' : ''}>Leaderboard content here</TabsContent>
        <TabsContent value="history" className={darkMode ? 'text-gray-100' : ''}>History content here</TabsContent>
      </Tabs>

      <div className={`fixed bottom-0 left-0 w-full p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-700'} flex justify-left space-x-4`}>
        <Button onClick={generateRandomScores} className="bg-green-500 hover:bg-green-600">Generate Random Scores</Button>
        <Button onClick={shuffleBoard} className="bg-blue-500 hover:bg-blue-600">Shuffle Board</Button>
        <Button onClick={nameNumbersTest} className="bg-purple-500 hover:bg-purple-600">Name Numbers Test</Button>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
          Created by onChain Studios
        </Button>
      </div>

      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent className="fixed inset-0 flex items-center justify-center">
          <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-400 text-gray-900'} rounded-lg p-6 w-96 max-w-full mx-auto`}>
            <DialogTitle className="text-xl font-bold mb-4">Customize Square {currentSquare?.row}{currentSquare?.col}</DialogTitle>
            <div className="mb-4">
              <Label htmlFor="selectionType" className="block mb-2">
                Selection Type
              </Label>
              <select
                id="selectionType"
                value={selectionType}
                onChange={(e) => setSelectionType(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
              >
                <option value="name">Enter Name</option>
                <option value="whale">Select Whale NFT</option>
              </select>
            </div>
            {selectionType === 'name' && (
              <div className="mb-4">
                <Label htmlFor="name" className="block mb-2">
                  Name
                </Label>
                <Input
                  id="name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-gray-700 text-white"
                />
              </div>
            )}
            <div className="mb-4">
              <Label htmlFor="textAngle" className="block mb-2">
                Text Angle
              </Label>
              <CircularAnglePicker angle={textAngle} setAngle={setTextAngle} />
              <div className="text-center mt-2">{textAngle}°</div>
            </div>
            <div className="mb-4">
              <Label htmlFor="textColor" className="block mb-2">
                Text Color
              </Label>
              <input
                type="color"
                id="textColor"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full bg-gray-700 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button onClick={handleNameSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">Confirm</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhaleSquaresOnSolana;