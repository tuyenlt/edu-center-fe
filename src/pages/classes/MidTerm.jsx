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
export default function MidTerm() {
  const audioRef = useRef(null);
  const lastVolumeRef = useRef(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [tab, setTab] = useState('p1');

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
    <div className="">
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

      <button
        className="fixed right-30 bottom-10 flex items-center"
        onClick={handlePrev}
      >
        <span className="fa fa-chevron-left mr-2"></span>
        <span>Previous</span>
      </button>
      <button
        className="fixed right-10 bottom-10 flex items-center"
        onClick={handleNext}
      >
        <span>Next</span>
        <span className="fa fa-chevron-right ml-2"></span>
      </button>
    </div>
  );
}
