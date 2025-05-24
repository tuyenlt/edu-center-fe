import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom/dist/index.js';

export default function LandingPage() {
    const navigate = useNavigate
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                    <div className="text-2xl font-bold">Englishnest</div>
                    <div className="space-x-6 hidden md:flex">
                        <a href="#about" className="hover:underline">About</a>
                        <a href="#courses" className="hover:underline">Courses</a>
                        <a href="#testimonials" className="hover:underline">Testimonials</a>
                        <a href="#contact" className="hover:underline">Contact</a>
                    </div>
                    <Button
                        className="bg-white text-blue-600 hover:bg-gray-100"
                        onClick={() => navigate('/login')}
                    >
                        Get Started</Button>
                    <Button className="md:hidden">Menu</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-blue-500 text-white">
                <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold">Learn English</h1>
                        <p className="text-lg md:text-xl">Start learning English with our expert teachers and interactive lessons.</p>
                        <Button
                            className="bg-white text-blue-600 hover:bg-gray-100"
                            onClick={() => navigate('/login')}
                        >
                            Get Started
                        </Button>
                    </div>
                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <img src="/images/hero.png" alt="Students" className="w-full rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="about" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Expert Instruction', desc: 'Learn from qualified and experienced teachers.', },
                            { title: 'Flexible Schedule', desc: 'Choose class times that suit your availability.', },
                            { title: 'Interactive Lessons', desc: 'Engage in live discussions and practice ease.', },
                        ].map((f, i) => (
                            <Card key={i} className="shadow-lg rounded-lg">
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                    <p className="text-gray-600">{f.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">What Our Students Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Sonna Anne', avatar: '/avatar1.jpg', quote: 'The teachers are very supportive and the lessons are engaging.' },
                            { name: 'Jire Improveed', avatar: '/avatar2.jpg', quote: 'Flexible schedule helped me learn at my own pace.' },
                        ].map((t, i) => (
                            <Card key={i} className="shadow-md bg-blue-50 rounded-lg">
                                <CardContent className="flex items-center p-6 space-x-4">
                                    <Avatar>
                                        <AvatarImage src={t.avatar} alt={t.name} />
                                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <p className="italic text-gray-700">"{t.quote}"</p>
                                        <p className="mt-2 font-medium text-gray-900">{t.name}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Contact Us</h2>
                        <p>Have questions? Get in touch with us.</p>
                    </div>
                    <form className="space-y-4">
                        <Input placeholder="Name" className="w-full bg-white text-black" />
                        <Input type="email" placeholder="Email" className="w-full bg-white text-black" />
                        <textarea
                            placeholder="Message"
                            rows={4}
                            className="w-full p-3 rounded bg-white text-black"
                        />
                        <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">
                            Send Message
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}