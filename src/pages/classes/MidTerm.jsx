import { Play, Pause, Volume2, Settings, Component } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Part1 from '../Assignments/Part1/Part1';
import Part2 from '../Assignments/Part2/Part2';
import { Button } from '@/components/ui/button';
export default function MidTerm() {
  const audioRef = useRef(null);
  const lastVolumeRef = useRef(100);
  const [recoverAndSave, setRecoverAndSave] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [tab, setTab] = useState('p1');
  function toggleRecoverOrSaveOpen() {
    return setRecoverAndSave((prev) => !prev);
  }
  const tabs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

  const handleNext = () => {
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex < tabs.length - 1) {
      setTab(tabs[currentIndex + 1]);
    }
  };
  const handlePrev = () => {
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex > 0) {
      setTab(tabs[currentIndex - 1]);
    }
  };
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  };
  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  }
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newProgress = e.target.value;
    if (!audio) return;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };
  function handleMuteOrUnmute() {
    if (volume > 0) {
      lastVolumeRef.current = volume;
      setVolume(0);
    } else setVolume(lastVolumeRef.current);
  }
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  return (
    <div className="grid grid-cols-7 gap-4 items-start">
      <div className="border p-5 rounded-2xl col-span-6 shadow-xl relative">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns:
              'max-content 1fr max-content max-content max-content max-content',
          }}
        >
          <audio
            ref={audioRef}
            src="/media/midterm-listening.mp3"
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
          <button onClick={togglePlay}>
            {isPlaying ? <Pause></Pause> : <Play></Play>}
          </button>
          <input
            className=""
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
          />
          <span>-{formatTime(duration - (duration * progress) / 100)}</span>
          <button
            className="hover:text-white hover:bg-blue-500"
            onClick={handleMuteOrUnmute}
          >
            <Volume2 />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <Settings />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Speed : {speed}x</DropdownMenuItem>
              <DropdownMenuItem>
                <Slider
                  min={0.5}
                  max={2}
                  step={0.25}
                  value={[speed]}
                  onValueChange={(value) => {
                    setSpeed(value[0]);
                    audioRef.current.playbackRate = speed;
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-10">
          <TabsList>
            <TabsTrigger value="p1">Part 1</TabsTrigger>
            <TabsTrigger value="p2">Part 2</TabsTrigger>
            <TabsTrigger value="p3">Part 3</TabsTrigger>
            <TabsTrigger value="p4">Part 4</TabsTrigger>
            <TabsTrigger value="p5">Part 5</TabsTrigger>
            <TabsTrigger value="p6">Part 6</TabsTrigger>
            <TabsTrigger value="p7">Part 7</TabsTrigger>
          </TabsList>
          <TabsContent value="p1">
            <Part1 />
          </TabsContent>
          <TabsContent value="p2">
            <Part2 />
          </TabsContent>
          {/* Các TabsContent khác tương tự */}
        </Tabs>

        <div className="absolute right-5 bottom-5 flex gap-3">
          <button className="flex items-center" onClick={handlePrev}>
            <span className="fa fa-chevron-left mr-2"></span>
            <span>PREVIOUS</span>
          </button>
          <button className="flex items-center" onClick={handleNext}>
            <span>NEXT</span>
            <span className="fa fa-chevron-right ml-2"></span>
          </button>
        </div>
      </div>
      <div className="border rounded-2xl col-span-1 shadow-xl p-3 sticky text-left">
        <p className="text-xl">Time remaining: </p>
        <p className="text-2xl font-bold">102:02</p>
        <button className="border border-blue-900 rounded-md py-3 text-blue-900 w-full mt-5 font-semibold text-xl">
          Submit
        </button>

        <div>
          <button
            className="w-full mt-3 text-red-600"
            onClick={toggleRecoverOrSaveOpen}
          >
            Recover | Save<span className="fa fa-chevron-right ml-2"></span>
          </button>
        </div>
        {recoverAndSave && (
          <div className="border rounded-2xl bg-gray-200 border-gray-300 shadow p-2 mt-2 pb-3">
            <p className="italic  text-red-600 ">
              If you went to a network trouble and cannot submit your process,
              click this to recover it.
            </p>
            <button className="border border-red-600 rounded-md py-1 text-red-600 w-full mt-2 font-semibold">
              Recover
            </button>
            <p className="italic  text-blue-800  mt-2">
              Or save it to continue later.
            </p>
            <button className="border border-blue-800 rounded-md py-1 text-blue-800 w-full mt-2 font-semibold">
              Recover
            </button>
          </div>
        )}
        <p className="mt-3 text-orange-400 italic font-bold ">
          You can click on question's number to review it later
        </p>
        <div className="">
          <span className="font-bold mt-3">Part 1</span>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p className="font-bold mt-3">Part 2</p>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 25 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 7}
              </button>
            ))}
          </div>
          <p className="font-bold mt-3">Part 3</p>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 39 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 32}
              </button>
            ))}
          </div>
          <p className="font-bold mt-3">Part 4</p>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 30 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 71}
              </button>
            ))}
          </div>
          <p className="font-bold mt-3">Part 5</p>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 30 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 101}
              </button>
            ))}
          </div>
          <p className="font-bold mt-3">Part 6</p>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 16 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 131}
              </button>
            ))}
          </div>
          <p className="font-bold mt-3">Part 7</p>
          <div className="grid grid-cols-5 gap-y-2 mt-3">
            {Array.from({ length: 54 }).map((_, index) => (
              <button
                key={index}
                className="border-[0.8px] border-zinc-900 rounded-[3px]  mr-1 text-center font-semibold hover:bg-blue-800 hover:text-white"
              >
                {index + 147}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
