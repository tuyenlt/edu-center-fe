import P1 from './Question';
export default function Part1() {
  const imageNumbers = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      {imageNumbers.map((number) => (
        <P1 key={number} number={number} />
      ))}
    </div>
  );
}
