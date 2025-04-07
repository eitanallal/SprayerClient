interface Props {
  title: string;
  value: string;
  unit?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}
export const HeaderInput: React.FC<Props> = ({
  title,
  value,
  unit,
  setter,
}) => {
  return (
    <div className="bg-blue-300 px-4 py-1 flex flex-col">
      <div className="">{title}</div>
      <div className="flex gap-1 justify-center">
        <input
          className="text-center bg-blue-300 border border-black w-20"
          placeholder=""
          onChange={(e) => setter(e.target.value)}
          value={value}
        />
        {unit ? <div className="text-center">{unit}</div> : null}
      </div>
    </div>
  );
};
