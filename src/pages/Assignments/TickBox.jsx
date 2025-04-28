import { RadioGroup } from '@/components/ui/radio-group';
import Tick from './Tick';
export default function TickBox() {
  return (
    <RadioGroup>
      <Tick value="A" />
      <Tick value="B" />
      <Tick value="C" />
      <Tick value="D" />
    </RadioGroup>
  );
}
