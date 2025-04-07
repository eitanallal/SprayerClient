interface Props {
  title: string;
  value: string;
  unit?: string;
}
export const HeaderItem: React.FC<Props> = ({ title, value, unit }) => {
  return (
    <div className="bg-blue-500 px-4 py-1 flex flex-col">
      <div className="text-center">{title}</div>
      <div className="flex gap-1 justify-center ">
        <div className="text-center">{value}</div>
        {unit ? <div className="text-center">{unit}</div> : null}
      </div>
    </div>
  );
};
