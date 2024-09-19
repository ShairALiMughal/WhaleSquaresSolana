// src/components/ui/Button.js
export const Button = ({ children, onClick, className }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 font-bold text-white rounded bg-indigo-600 hover:bg-indigo-700 ${className}`}
      >
        {children}
      </button>
    );
  };
  