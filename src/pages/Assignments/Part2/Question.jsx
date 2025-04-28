import { RadioGroup } from '@/components/ui/radio-group';
import Tick from '../Tick';
export default function Question({ number }) {
  return (
    <div
      className={`flex gap-3 pb-5 pt-5 ${
        number !== 31 ? 'border' : ''
      } border-x-0 border-t-0 border-gray-200`}
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full text-blue-800 bg-blue-100">
        {number}
      </span>

      <RadioGroup>
        <Tick value="A" />
        <Tick value="B" />
        <Tick value="C" />
      </RadioGroup>
    </div>
  );
}
