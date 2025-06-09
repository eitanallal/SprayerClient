interface Props {
  text: string;
  color: keyof typeof colorMap;
  onClick?: () => void;
}

export const colorMap = {
  blue: {
    base: 'bg-blue-600',
    hover: 'hover:bg-blue-800',
    text: 'text-white',
  },
  red: {
    base: 'bg-red-500',
    hover: 'hover:bg-red-700',
    text: 'text-white',
  },
  green: {
    base: 'bg-green-500',
    hover: 'hover:bg-green-700',
    text: 'text-white',
  },
  white: {
    base: 'bg-white',
    hover: 'hover:bg-gray-200',
    text: 'text-black',
  },
  grey1: {
    base: 'bg-gray-300',
    hover: 'hover:bg-gray-700',
    text: 'text-black',
  },
  grey2: {
    base: 'bg-gray-400',
    hover: 'hover:bg-gray-600',
    text: 'text-black',
  },
};

export const Button: React.FC<Props> = ({ text, color, onClick }) => {
  const style = colorMap[color];

  return (
    <div
      onClick={onClick}
      className={`w-1/6 h-2/5 text-center p-4 border
       border-black rounded-md ${style.text} ${style.base} ${style.hover}`}
    >
      {text}
    </div>
  );
};
