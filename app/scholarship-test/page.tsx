"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
    CheckCircle2, 
    XCircle, 
    Clock, 
    AlertTriangle, 
    ChevronRight, 
    ChevronLeft, 
    Send,
    Instagram,
    Users
} from "lucide-react";

// --- TYPES & DATA ---

type ScreenState = "REGISTRATION" | "INSTRUCTIONS" | "TEST" | "RESULTS" | "TIMEOUT";

interface Question {
    id: string;
    type: "MCQ" | "TF";
    text: string;
    options: string[];
    correctAnswer: string;
}

const QUESTIONS: Question[] = [
    {
        id: "q1",
        type: "MCQ",
        text: "Which of the following is an example of an AI tool?",
        options: ["Microsoft Word", "ChatGPT", "A USB flash drive", "A calculator"],
        correctAnswer: "ChatGPT"
    },
    {
        id: "q2",
        type: "TF",
        text: "AI tools like ChatGPT can understand and respond to questions written in plain everyday language.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q3",
        type: "MCQ",
        text: "What does \"AI\" stand for?",
        options: ["Automated Interface", "Automated Internet", "Artificial Intelligence", "Applied Innovation"],
        correctAnswer: "Artificial Intelligence"
    },
    {
        id: "q4",
        type: "TF",
        text: "Gemini is an AI tool created by Google.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q5",
        type: "MCQ",
        text: "Which of the following best describes what an AI tool like ChatGPT can do?",
        options: [
            "It can only search the internet and return links",
            "It can generate text, answer questions, and help with writing tasks",
            "It can only work with numbers and spreadsheets",
            "It can only translate languages"
        ],
        correctAnswer: "It can generate text, answer questions, and help with writing tasks"
    },
    {
        id: "q6",
        type: "MCQ",
        text: "A person uses an AI tool to help them write a professional email. This is an example of:",
        options: [
            "Cheating at work",
            "Using AI as a practical productivity tool",
            "Replacing human intelligence entirely",
            "Hacking"
        ],
        correctAnswer: "Using AI as a practical productivity tool"
    },
    {
        id: "q7",
        type: "TF",
        text: "AI tools are only useful for people who work in technology companies.",
        options: ["True", "False"],
        correctAnswer: "False"
    },
    {
        id: "q8",
        type: "MCQ",
        text: "Which of these companies created ChatGPT?",
        options: ["Google", "Microsoft", "OpenAI", "Apple"],
        correctAnswer: "OpenAI"
    },
    {
        id: "q9",
        type: "MCQ",
        text: "You receive an email asking you to click a link and enter your bank details urgently. What should you do?",
        options: [
            "Click the link immediately — it is probably important",
            "Forward it to all your contacts",
            "Be suspicious — this is likely a phishing scam. Do not click the link.",
            "Reply with your details to confirm your identity"
        ],
        correctAnswer: "Be suspicious — this is likely a phishing scam. Do not click the link."
    },
    {
        id: "q10",
        type: "TF",
        text: "A strong password should be long, include a mix of letters, numbers, and symbols, and not be reused across multiple accounts.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q11",
        type: "MCQ",
        text: "What does it mean to \"download\" a file?",
        options: [
            "To delete a file from your device",
            "To copy a file from the internet or another source onto your device",
            "To send a file to someone else",
            "To print a file"
        ],
        correctAnswer: "To copy a file from the internet or another source onto your device"
    },
    {
        id: "q12",
        type: "MCQ",
        text: "Which of the following is a cloud storage service where you can save and access files from any device?",
        options: ["Bluetooth", "Google Drive", "A USB cable", "A printer"],
        correctAnswer: "Google Drive"
    },
    {
        id: "q13",
        type: "TF",
        text: "You can access Google Docs on both a smartphone and a laptop using the same Google account.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q14",
        type: "MCQ",
        text: "What is a web browser?",
        options: [
            "A program used to search and view websites on the internet",
            "A type of email application",
            "A software that protects your computer from viruses",
            "A tool for creating spreadsheets"
        ],
        correctAnswer: "A program used to search and view websites on the internet"
    },
    {
        id: "q15",
        type: "TF",
        text: "Wifi and mobile data are both ways to connect a device to the internet.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q16",
        type: "MCQ",
        text: "Which of the following is the safest thing to do before sharing personal information on a website?",
        options: [
            "Check that the website address starts with \"https\" and belongs to a trusted organisation",
            "Share the information as long as the website looks nice",
            "Only share information if the website has a lot of images",
            "Share the information if a friend recommended the website"
        ],
        correctAnswer: "Check that the website address starts with \"https\" and belongs to a trusted organisation"
    },
    {
        id: "q17",
        type: "MCQ",
        text: "You are given a task you have never done before. What is the BEST first step?",
        options: [
            "Refuse to do it because you have no experience",
            "Wait for someone else to do it",
            "Break the task into smaller steps and figure out what you need to learn",
            "Guess randomly and hope for the best"
        ],
        correctAnswer: "Break the task into smaller steps and figure out what you need to learn"
    },
    {
        id: "q18",
        type: "TF",
        text: "If you try something new and it does not work the first time, the best response is to give up immediately.",
        options: ["True", "False"],
        correctAnswer: "False"
    },
    {
        id: "q19",
        type: "MCQ",
        text: "A tool gives you an output that is almost right but not quite what you needed. What should you do?",
        options: [
            "Accept it as-is even if it is not useful",
            "Throw away the tool entirely",
            "Adjust your instructions and try again to get a better result",
            "Assume the tool is broken"
        ],
        correctAnswer: "Adjust your instructions and try again to get a better result"
    },
    {
        id: "q20",
        type: "MCQ",
        text: "You need to complete a 3-hour task but only have 1 hour today. What is the most logical approach?",
        options: [
            "Do nothing until you have 3 full hours free",
            "Break the task into parts and complete what you can today, continuing tomorrow",
            "Rush through all 3 hours of work in 1 hour",
            "Ask someone else to do all of it"
        ],
        correctAnswer: "Break the task into parts and complete what you can today, continuing tomorrow"
    },
    {
        id: "q21",
        type: "TF",
        text: "Reading instructions carefully before starting a task usually saves time in the long run.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q22",
        type: "MCQ",
        text: "Which of the following describes a person who is most likely to succeed in a self-paced online learning program?",
        options: [
            "Someone who waits to be reminded before doing their lessons",
            "Someone who only participates when it is convenient",
            "Someone who sets aside regular time, stays consistent, and asks questions when stuck",
            "Someone who skips the parts they find difficult"
        ],
        correctAnswer: "Someone who sets aside regular time, stays consistent, and asks questions when stuck"
    },
    {
        id: "q23",
        type: "MCQ",
        text: "You read an article online that makes a surprising claim. What is the responsible thing to do before sharing it?",
        options: [
            "Share it immediately — if it is online it must be true",
            "Verify the claim by checking other reliable sources before sharing",
            "Share it only if it has many likes or comments",
            "Only share it if it agrees with your existing opinion"
        ],
        correctAnswer: "Verify the claim by checking other reliable sources before sharing"
    },
    {
        id: "q24",
        type: "TF",
        text: "Learning a new skill always requires some level of discomfort, patience, and practice before it becomes natural.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        id: "q25",
        type: "MCQ",
        text: "Why might someone with no technical background still benefit from learning how to use AI tools?",
        options: [
            "They would not — AI tools are only for programmers and developers",
            "Because AI tools are designed to be used in plain language, making them accessible to anyone willing to learn",
            "Because AI will automatically do all their work without any input from them",
            "Because AI tools are free and that is the only advantage"
        ],
        correctAnswer: "Because AI tools are designed to be used in plain language, making them accessible to anyone willing to learn"
    }
];

// --- STYLES ---

const colors = {
    bg: "#FFFFFF",
    surface: "#F9FAFB",
    accent: "#934ab3", // Brand Purple
    textMuted: "#6B7280",
    border: "#E5E7EB",
    success: "#22C55E",
    error: "#EF4444"
};

// --- COMPONENTS ---

export default function ScholarshipTestPage() {
    const [screen, setScreen] = useState<ScreenState>("REGISTRATION");
    const [user, setUser] = useState({ fullName: "", email: "", whatsapp: "" });
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [errors, setErrors] = useState({ fullName: "", email: "", whatsapp: "" });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // --- REGISTRATION LOGIC ---
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { fullName: "", email: "", whatsapp: "" };

        if (user.fullName.length < 2 || /\d/.test(user.fullName)) {
            newErrors.fullName = "Please enter a valid full name (at least 2 characters, no numbers).";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        if (user.whatsapp.length < 8) {
            newErrors.whatsapp = "Please enter a valid WhatsApp number.";
            valid = false;
        }

        setErrors(newErrors);
        if (valid) {
            setScreen("INSTRUCTIONS");
            window.scrollTo(0, 0);
        }
    };

    // --- TIMER LOGIC ---
    useEffect(() => {
        if (screen === "TEST" && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && screen === "TEST") {
            setScreen("TIMEOUT");
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [screen, timeRemaining]);

    const formatTime = (seconds: number) => {
        const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
        const ss = (seconds % 60).toString().padStart(2, "0");
        return `${mm}:${ss}`;
    };

    const getTimerColor = () => {
        if (timeRemaining > 300) return "text-white";
        if (timeRemaining > 60) return "text-amber-500 animate-pulse";
        return "text-red-500 animate-[pulse_0.5s_infinite]";
    };

    // --- TEST LOGIC ---
    const handleAnswerSelect = (qId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [qId]: answer }));
    };

    const calculateResults = async () => {
        let currentScore = 0;
        QUESTIONS.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                currentScore++;
            }
        });
        setScore(currentScore);
        
        // Send results to backend API for email notification
        try {
            await fetch('/api/scholarship-test/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: user.fullName,
                    email: user.email,
                    whatsapp: user.whatsapp,
                    score: currentScore
                }),
            });
        } catch (error) {
            console.error('Failed to send test results:', error);
        }

        setScreen("RESULTS");
        window.scrollTo(0, 0);
    };

    const handleSubmitTest = () => {
        const unansweredCount = QUESTIONS.length - Object.keys(answers).length;
        if (unansweredCount > 0 && !showWarning) {
            setShowWarning(true);
            return;
        }
        setShowWarning(false);
        setIsSubmitting(true);
        if (timerRef.current) clearInterval(timerRef.current);
        
        // Brief artificial delay for "feel"
        setTimeout(() => {
            calculateResults();
            setIsSubmitting(false);
        }, 1000);
    };

    const resetTest = () => {
        setScreen("REGISTRATION");
        setUser({ fullName: "" , email: "", whatsapp: "" });
        setAnswers({});
        setCurrentQuestionIndex(0);
        setTimeRemaining(600);
        setScore(0);
        setErrors({ fullName: "", email: "", whatsapp: "" });
    };

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;

    const firstName = user.fullName.split(' ')[0];

    // --- UI RENDERING ---

    return (
        <div className="min-h-screen text-black selection:bg-purple-500/30 font-sans" style={{ backgroundColor: colors.bg }}>
            {/* STYLES FOR ANIMATIONS */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Outfit:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
                
                body {
                    font-family: 'DM Sans', sans-serif;
                }
                
                h1, h2, h3 {
                    font-family: 'Outfit', sans-serif;
                }

                .syne-heading {
                    font-family: 'Syne', sans-serif;
                }

                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `}</style>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <AnimatePresence mode="wait">
                    
                    {/* SCREEN 1: REGISTRATION */}
                    {screen === "REGISTRATION" && (
                        <motion.div
                            key="registration"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <div className="mb-12 flex flex-col items-center">
                                <div className="relative w-48 h-12 mb-6">
                                    <Image 
                                        src="/academylogo.webp" 
                                        alt="Khrien Academy Logo" 
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        priority
                                    />
                                </div>
                                <span className="inline-block px-3 py-1 bg-purple-500/10 text-[#934ab3] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                    The Genesis Cohort
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
                                    Scholarship Qualification Test
                                </h2>
                                <p className="text-[#934ab3]/80 font-medium text-lg mb-8 uppercase tracking-widest">
                                    AI Foundations & Practical Intelligence
                                </p>
                                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                    Welcome, applicant. To be considered for a full scholarship seat in the Genesis Cohort, 
                                    you must complete and pass this qualification test. Read the instructions carefully before you begin. Good luck.
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-6 text-left">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={user.fullName}
                                        onChange={(e) => setUser(prev => ({ ...prev, fullName: e.target.value }))}
                                        placeholder="Enter your legal name"
                                        className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-black`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="your@email.com"
                                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-black`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-2">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        value={user.whatsapp}
                                        onChange={(e) => setUser(prev => ({ ...prev, whatsapp: e.target.value }))}
                                        placeholder="+234..."
                                        className={`w-full bg-gray-50 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-black`}
                                    />
                                    {errors.whatsapp && <p className="text-red-500 text-xs mt-2">{errors.whatsapp}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#934ab3] text-white font-bold py-4 rounded-xl hover:bg-black transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    View Instructions & Proceed <ChevronRight size={20} />
                                </button>
                                
                                <p className="text-center text-xs text-gray-500 py-4">
                                    This test contains 25 questions and must be completed within 10 minutes.
                                </p>
                            </form>
                        </motion.div>
                    )}

                    {/* SCREEN 2: INSTRUCTIONS */}
                    {screen === "INSTRUCTIONS" && (
                        <motion.div
                            key="instructions"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="text-3xl font-bold mb-2 text-black">Before You Begin</h2>
                            <p className="text-[#934ab3] mb-8 italic">
                                Please read these instructions carefully. The timer starts the moment you click 'Start Test'.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    { text: "This test consists of 25 questions — a mix of Multiple Choice and True/False.", strong: true },
                                    { text: "You have 10 minutes to complete the test. The timer begins when you click \"Start Test\".", strong: true },
                                    { text: "Once the timer starts, it cannot be paused.", strong: true },
                                    { text: "You can navigate between questions freely before submitting." },
                                    { text: "Each question carries equal marks. There is no negative marking." },
                                    { text: "You must answer all 25 questions before submitting. Unanswered questions count as wrong." },
                                    { text: "Your result will be displayed immediately after submission." },
                                    { text: "Only applicants who pass this test will receive a scholarship and admission to the Genesis Cohort.", strong: true },
                                    { text: "Ensure you are in a quiet environment with a stable internet connection before starting." },
                                    { text: "Do not refresh or close this page during the test — your progress will be lost." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 text-[#934ab3] flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                        <p className={`text-gray-600 text-sm md:text-base ${step.strong ? 'font-medium text-black' : ''}`}>
                                            {step.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-xl font-medium mb-8 text-black">
                                Good luck, <span className="text-[#934ab3]">{firstName}</span>!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setScreen("REGISTRATION")}
                                    className="flex-1 border border-gray-200 hover:bg-gray-50 py-4 rounded-xl flex items-center justify-center gap-2 text-gray-500"
                                >
                                    <ChevronLeft size={20} /> Go Back
                                </button>
                                <button
                                    onClick={() => { setScreen("TEST"); window.scrollTo(0, 0); }}
                                    className="flex-1 bg-[#934ab3] text-white font-bold py-4 rounded-xl hover:bg-black transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    Start Test <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* SCREEN 3: TEST */}
                    {screen === "TEST" && (
                        <motion.div
                            key="test"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pb-32 lg:pb-12"
                        >
                            {/* STICKY HEADER */}
                            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 -mx-4 px-4 flex justify-between items-center mb-8 shadow-sm">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Scholarship Test</span>
                                    <h3 className="text-lg font-bold text-black">Genesis Cohort</h3>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-mono font-bold flex items-center gap-2 ${getTimerColor().replace('text-white', 'text-black')}`}>
                                        <Clock size={20} /> {formatTime(timeRemaining)}
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                                        {answeredCount} / 25 Answered
                                    </div>
                                </div>
                                {/* PROGRESS BAR */}
                                <div className="absolute bottom-0 left-0 h-1 bg-[#934ab3] transition-all duration-300" style={{ width: `${(answeredCount / 25) * 100}%` }}></div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 text-black">
                                {/* MAIN QUESTION AREA */}
                                <div className="flex-1">
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={currentQuestion.id}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className={`p-6 md:p-10 rounded-3xl border transition-all duration-300 ${answers[currentQuestion.id] ? 'border-purple-500/30 bg-purple-500/5' : 'border-gray-200 bg-gray-50'}`}
                                        >
                                            <div className="flex justify-between items-start mb-8">
                                                <span className="text-sm font-black text-[#934ab3] uppercase tracking-widest">Question {currentQuestionIndex + 1}</span>
                                                <span className="text-[10px] bg-white text-gray-500 px-3 py-1 rounded-full border border-gray-200 font-bold uppercase tracking-wider">
                                                    {currentQuestion.type === "MCQ" ? "Multiple Choice" : "True / False"}
                                                </span>
                                            </div>
                                            <h4 className="text-2xl md:text-3xl font-medium leading-tight mb-10 text-black">{currentQuestion.text}</h4>
                                            
                                            <div className="grid gap-4">
                                                {currentQuestion.options.map((opt) => (
                                                    <label 
                                                        key={opt}
                                                        className={`
                                                            relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                                            ${answers[currentQuestion.id] === opt 
                                                                ? 'border-purple-500 bg-purple-500/5' 
                                                                : 'border-gray-100 hover:border-gray-300 bg-white'
                                                            }
                                                        `}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={currentQuestion.id}
                                                            value={opt}
                                                            checked={answers[currentQuestion.id] === opt}
                                                            onChange={() => handleAnswerSelect(currentQuestion.id, opt)}
                                                            className="hidden"
                                                        />
                                                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${answers[currentQuestion.id] === opt ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
                                                            {answers[currentQuestion.id] === opt && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                                                        </div>
                                                        <span className={`text-base md:text-lg ${answers[currentQuestion.id] === opt ? 'text-[#934ab3] font-medium' : 'text-gray-500'}`}>
                                                            {opt}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>

                                            {/* NAVIGATION CONTROLS */}
                                            <div className="flex gap-4 mt-12 pt-8 border-t border-gray-100">
                                                <button
                                                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                                    disabled={currentQuestionIndex === 0}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${currentQuestionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 active:scale-95'}`}
                                                >
                                                    <ChevronLeft size={20} /> Previous
                                                </button>
                                                
                                                {currentQuestionIndex < 24 ? (
                                                    <button
                                                        onClick={() => setCurrentQuestionIndex(prev => Math.min(24, prev + 1))}
                                                        className="flex-1 bg-purple-50 hover:bg-purple-100 text-[#934ab3] font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                                    >
                                                        Next Question <ChevronRight size={20} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleSubmitTest}
                                                        className="flex-1 bg-[#934ab3] text-white font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,74,179,0.2)]"
                                                    >
                                                        Review & Submit <Send size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* SIDEBAR NAVIGATION */}
                                <div className="lg:w-72">
                                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sticky top-28">
                                        <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
                                            Question Navigator
                                        </h5>
                                        <div className="grid grid-cols-5 gap-2">
                                            {QUESTIONS.map((q, idx) => {
                                                const isAnswered = !!answers[q.id];
                                                const isActive = currentQuestionIndex === idx;
                                                return (
                                                    <button
                                                        key={q.id}
                                                        onClick={() => setCurrentQuestionIndex(idx)}
                                                        className={`
                                                            w-full aspect-square rounded-xl text-xs font-black transition-all flex items-center justify-center
                                                            ${isActive ? 'ring-2 ring-[#934ab3] ring-offset-4 ring-offset-white bg-[#934ab3] text-white scale-110 z-10' : ''}
                                                            ${!isActive && isAnswered ? 'bg-purple-100 text-[#934ab3] border border-purple-200' : ''}
                                                            ${!isActive && !isAnswered ? 'bg-white text-gray-400 border border-gray-200 hover:border-gray-400' : ''}
                                                        `}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-md bg-[#934ab3]"></div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-md bg-purple-100 border border-purple-200"></div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Answered</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-md bg-white border border-gray-200"></div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unanswered</span>
                                            </div>
                                        </div>

                                        {answeredCount === 25 && (
                                            <button 
                                                onClick={handleSubmitTest}
                                                className="w-full mt-8 py-4 bg-green-500 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                                            >
                                                Finish & Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* MOBILE BOTTOM SUBMIT (IF NOT ALL ANSWERED) */}
                            {answeredCount < 25 && (
                                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 lg:hidden z-50">
                                    <button
                                        onClick={handleSubmitTest}
                                        disabled={isSubmitting}
                                        className="w-full bg-gray-100 hover:bg-[#934ab3] hover:text-white text-gray-500 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        Preview Submission
                                    </button>
                                </div>
                            )}

                            {/* WARNING MODAL */}
                            {showWarning && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-white border border-amber-200 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
                                    >
                                        <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
                                        <h4 className="text-xl font-bold mb-2 text-black">Unfinished Business</h4>
                                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                            You have {QUESTIONS.length - Object.keys(answers).length} unanswered questions. 
                                            Unanswered questions will be marked as incorrect. Are you sure you want to submit?
                                        </p>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setShowWarning(false)}
                                                className="flex-1 py-3 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-gray-500"
                                            >
                                                Go Back
                                            </button>
                                            <button 
                                                onClick={handleSubmitTest}
                                                className="flex-1 py-3 text-sm font-bold bg-amber-500 text-white rounded-xl hover:bg-amber-600 active:scale-95 transition-all"
                                            >
                                                Submit Anyway
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}                        {/* SCREEN 4: RESULTS */}
                    {screen === "RESULTS" && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            {score >= 15 ? (
                                <div className="space-y-8">
                                    <CheckCircle2 size={100} className="text-green-500 mx-auto drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black mb-2 text-black">Congratulations, {firstName}! 🎉</h2>
                                        <p className="text-xl text-green-600 font-medium">You have passed the Genesis Cohort Scholarship Test</p>
                                    </div>
                                    <div className="inline-block p-1 bg-green-50 border border-green-100 rounded-2xl px-12 py-10">
                                        <span className="text-sm font-bold text-gray-400 block mb-2 uppercase tracking-widest">Your Score</span>
                                        <span className="text-6xl font-black text-black">{score}/25</span>
                                        <span className="block mt-2 text-xl font-bold text-green-600">{(score/25*100).toFixed(0)}%</span>
                                    </div>

                                    <div className="bg-green-50 border border-green-100 rounded-3xl p-8 max-w-2xl mx-auto text-left">
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            You have qualified for a scholarship seat in the Genesis Cohort — AI Foundations & Practical Intelligence. 
                                            Our team will be in touch at <span className="text-green-600 font-bold underline">{user.email}</span> with your onboarding details. Welcome to the beginning of something great.
                                        </p>
                                        <div className="flex gap-4 items-center pt-4 border-t border-green-100">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                                Cohort Dates: <span className="text-black">May 4 – July 5</span>
                                            </span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:inline">•</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:inline">
                                                Duration: <span className="text-black">3 Months</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 text-black">
                                    <XCircle size={100} className="text-red-500 mx-auto drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Thank You for Applying, {firstName}</h2>
                                        <p className="text-lg text-gray-500">Unfortunately, you did not pass the scholarship test this time.</p>
                                    </div>
                                    <div className="inline-block p-1 bg-red-50 border border-red-100 rounded-2xl px-12 py-10">
                                        <span className="text-sm font-bold text-gray-400 block mb-2 uppercase tracking-widest">Your Score</span>
                                        <span className="text-6xl font-black text-black">{score}/25</span>
                                        <span className="block mt-2 text-xl font-bold text-red-500">{(score/25*100).toFixed(0)}%</span>
                                    </div>
                                    <div className="bg-red-50 border border-red-100 rounded-3xl p-8 max-w-2xl mx-auto text-left">
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            Don't be discouraged. We will be opening future cohorts and you are welcome to apply again. 
                                            Keep learning and we hope to see you in a future Khrien Academy program.
                                        </p>
                                        <p className="text-gray-500 font-medium text-sm text-center">
                                            Follow us on Instagram and join our community to stay updated on future cohort openings.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* ANSWER REVIEW */}
                            <div className="mt-24 text-left">
                                <h3 className="text-2xl font-bold mb-8 syne-heading border-b border-gray-100 pb-4 text-black text-center lg:text-left">Detailed Review</h3>
                                <div className="space-y-6">
                                    {QUESTIONS.map((q, idx) => {
                                        const isCorrect = answers[q.id] === q.correctAnswer;
                                        return (
                                            <div key={q.id} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-xs font-black text-gray-400 uppercase">Q{idx + 1}</span>
                                                    {isCorrect ? (
                                                        <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Correct</span>
                                                    ) : (
                                                        <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Incorrect</span>
                                                    )}
                                                </div>
                                                <p className="text-lg font-medium mb-4 text-black">{q.text}</p>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Your Answer</span>
                                                        <div className={`p-2 px-3 rounded-lg text-sm border ${isCorrect ? 'border-green-200 bg-white text-green-600' : 'border-red-200 bg-white text-red-500'}`}>
                                                            {answers[q.id] || "No answer provided"}
                                                        </div>
                                                    </div>
                                                    {!isCorrect && (
                                                        <div>
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Correct Answer</span>
                                                            <div className="p-2 px-3 rounded-lg text-sm border border-green-200 bg-green-50 text-green-600 font-bold">
                                                                {q.correctAnswer}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                onClick={resetTest}
                                className="mt-16 text-gray-400 hover:text-black transition-colors text-sm underline"
                            >
                                Back to Main Website
                            </button>
                        </motion.div>
                    )}

                    {/* SCREEN 5: TIMEOUT */}
                    {screen === "TIMEOUT" && (
                        <motion.div
                            key="timeout"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <Clock size={100} className="text-red-500 mx-auto mb-8 animate-[pulse_1s_infinite]" />
                            <h2 className="text-5xl font-black mb-6 text-black">Time's Up</h2>
                            <div className="bg-red-50 border border-red-100 rounded-3xl p-10 max-w-2xl mx-auto space-y-6">
                                <p className="text-xl text-gray-700 font-medium">
                                    Your 10-minute test window has expired.
                                </p>
                                <p className="text-gray-500 leading-relaxed">
                                    Unfortunately, your test could not be submitted in time and you have not qualified for this round of the scholarship.
                                </p>
                                <div className="pt-8 space-y-4">
                                    <p className="text-red-500 font-bold uppercase tracking-widest text-sm">What now?</p>
                                    <p className="text-gray-500">
                                        We will be opening future cohorts. Follow us on Instagram and join our community to be the first to know.
                                    </p>
                                    <div className="flex justify-center gap-6 pt-4">
                                        <a href="https://www.instagram.com/thisis_khrien" className="text-[#934ab3] hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
                                            <Instagram size={28} />
                                        </a>
                                        <a href="https://chat.whatsapp.com/KavR69S3M3rBox593jkKEw" className="text-[#934ab3] hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
                                            <Users size={28} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={resetTest}
                                className="mt-12 text-gray-400 hover:text-[#934ab3] transition-colors text-sm underline"
                            >
                                Close Portal
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
