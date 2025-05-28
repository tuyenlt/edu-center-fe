import { useEffect, useState } from 'react';
import { welcomeMessages } from './data';

export default function WelcomeBanner({ username }) {
  const [welcome, setWelcome] = useState();
  useEffect(() => {
    setWelcome(
      welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
    );
  }, []);

  return (
    <div className="bg-[#0146ab] text-white rounded-2xl flex flex-col md:flex-row justify-between items-center">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2 ">Welcome back, {username}</h1>
        <p className="max-w-[532px] text-base">{welcome}</p>
      </div>
      <img src="/images/image.png" alt="Welcome" className="h-[176px] block" />
    </div>
  );
}
