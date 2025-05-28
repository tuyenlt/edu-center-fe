import { Link } from 'react-router-dom';

export default function MiniClassPost({ classes }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll h-[396px]">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Class Notifications</h2>
        <Link to="/" className="text-blue-700 text-sm font-medium">
          See all
        </Link>
      </div>
    </div>
  );
}
