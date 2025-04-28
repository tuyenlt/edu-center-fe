import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
export default function Tick({ value }) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`r${value}`} />
      <Label htmlFor={`r${value}`}>{value}.</Label>
    </div>
  );
}
//dm ko biet dat ten sao lun
