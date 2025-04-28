import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, CalendarIcon } from 'lucide-react';

export default function ClassExerciseCard() {
  return (
    <Card className="mt-7 gap-0">
      <CardHeader>
        <div className="flex gap-7 items-center justify-between">
          <p className="text-neutral-600 text-xl hover:underline">AI - N10</p>
          <Badge className="bg-red-100 text-red-500 relative">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            <span>Due 23:59pm</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-zinc-500 text-sm hover:underline">Exercise 1</p>
      </CardContent>
    </Card>
  );
}
