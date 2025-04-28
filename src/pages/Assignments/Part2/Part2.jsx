import Question from './Question';

export default function Part2() {
  return (
    <div>
      {Array.from({ length: 32 - 7 }, (_, index) => (
        <Question key={index} number={index + 7} />
      ))}
    </div>
  );
}
