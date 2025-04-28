import TickBox from '../TickBox';

export default function P1({ number }) {
  return (
    <div
      className={`flex items-start gap-10 ${
        number !== 6 ? 'border' : ''
      } border-r-gray-700 border-x-0 border-t-0 py-10`}
    >
      <img
        src={`/images/p1/${number}.png`}
        alt={`Image ${number}`}
        className="w-1/2 bg-cover"
      />

      <div className="flex gap-3">
        <span className="flex items-center justify-center w-9 h-9 rounded-full text-blue-800 bg-blue-100">
          {number}
        </span>

        <TickBox />
      </div>
    </div>
  );
}
