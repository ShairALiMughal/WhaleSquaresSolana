import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Wallet, Sun, Moon } from 'lucide-react';
import WhaleNFTIcon from './WhaleNFTIcon';
import WhaleIcon from './WhaleIcon';
import NFTCharacter from './NFTCharacter';
import CircularAnglePicker from './CircularAnglePicker';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import TeamSelect from './TeamSelect';
import './WhaleSquaresOnSolana.css';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
import logo from './logos/logo.jpeg'
import leftwhale from './logos/leftwhale.png';
import rightwhale from './logos/rightwhale.png'
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
  const [textAngle, setTextAngle] = useState(0);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [selectionType, setSelectionType] = useState('name');
  const dialogRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);



  const connectWallet = () => setIsWalletConnected(!isWalletConnected);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsNameDialogOpen(false);
    }
  };

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
    if (event.key === 'Enter') handleNameSubmit();
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
        ) : selectedName && selectedName.toLowerCase() === 'nft' ? (
          <NFTCharacter />
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
    <div className={`min-h-screen relative ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Whale Squares on Solana</h1>
        </div>
        <div className="header-buttons">
          <button
            onClick={connectWallet}
            className={`px-4 py-2 rounded-full ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white flex items-center`}
          >
            <Wallet size={18} className="mr-2" />
            {isWalletConnected ? 'Disconnect' : 'Connect Wallet'}
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-yellow-400'
            }`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>
     

      <div className="game-container grid grid-cols-[min-content,1fr,min-content] gap-2">
  {/* First column: Buttons */}
  <div className="p-1">
  <div className="mt-24 flex flex-col space-y-5">
      <Button onClick={generateRandomScores} className="bg-green-500 hover:bg-green-600">Generate Random Scores</Button>
      <Button onClick={shuffleBoard} className="bg-blue-500 hover:bg-blue-600">Shuffle Board</Button>
      <Button onClick={nameNumbersTest} className="bg-purple-500 hover:bg-purple-600">Name Numbers Test</Button>
      <div className="mt-2 flex justify-center">
      </div>    
      <img src={leftwhale} alt="Placeholder image" className="rounded-lg shadow-md" />
    
 
    </div>
  </div>

  {/* Second column: Game board (full width) */}
  <div className="p-4">
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

  {/* Third column: Currently empty */}
  <div>
    <div className={`game-rules ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} rounded-lg p-4`}>
      <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Rules</h2>
      <p>Amount solana per Square</p>
      <ul>
        <li>1st Quarter Winner $250</li>
        <li>2nd Quarter Winner $500</li>
        <li>3rd Quarter Winner $250</li>
        <li>4th Quarter Winner $1000</li>
      </ul>
    </div>
    <div className="mt-16 flex justify-center">
      <img src={rightwhale} alt="Placeholder image" className="rounded-lg shadow-md" />
    </div>
  </div>
</div>


      {/* Dialog for setting text style */}
<Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
  <DialogContent className="fixed inset-0 flex items-center justify-center">
    <div 
      className="fixed inset-0 bg-black bg-opacity-50"
      onClick={() => setIsNameDialogOpen(false)}
    />
    <div 
      className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-400 text-gray-900'} rounded-lg p-6 w-96 max-w-full mx-auto relative`}
      onClick={(e) => e.stopPropagation()}
    >
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
        <Button onClick={handleNameSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">Confirm</Button>
      </div>
    </div>
  </DialogContent>
</Dialog>
</div>
  );
};

export default WhaleSquaresOnSolana;
