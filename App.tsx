import { Dashboard } from "./components/Dashboard";
import { WorkoutTracker } from "./components/WorkoutTracker";
import { WaterTracker } from "./components/WaterTracker";
import { SleepTracker } from "./components/SleepTracker";
import { NutritionTracker } from "./components/NutritionTracker";
import { Goals } from "./components/Goals";
import { Insights } from "./components/Insights";
import { AboutUs } from "./components/AboutUs";
import { WelcomeModal } from "./components/WelcomeModal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Droplets,
  Moon,
  Utensils,
  LayoutDashboard,
  Target,
  TrendingUp,
  Menu,
  X,
  Zap,
  Info,
} from "lucide-react";

// MOCK DATA FOR DESIGN PROTOTYPE - Not a real functioning app
const MOCK_WORKOUTS = [
  {
    id: "1",
    date: new Date().toISOString().split("T")[0],
    type: "Running",
    duration: 30,
    calories: 300,
    notes: "Morning run",
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    type: "Yoga",
    duration: 45,
    calories: 150,
  },
  {
    id: "3",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    type: "HIIT",
    duration: 25,
    calories: 280,
  },
];

const MOCK_WATER = [
  {
    id: "1",
    date: new Date().toISOString().split("T")[0],
    amount: 500,
    time: "09:00",
  },
  {
    id: "2",
    date: new Date().toISOString().split("T")[0],
    amount: 750,
    time: "12:00",
  },
  {
    id: "3",
    date: new Date().toISOString().split("T")[0],
    amount: 500,
    time: "15:00",
  },
];

const MOCK_SLEEP = [
  {
    id: "1",
    date: new Date().toISOString().split("T")[0],
    hours: 7.5,
    quality: "good" as const,
    notes: "Slept well",
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    hours: 8,
    quality: "excellent" as const,
  },
];

const MOCK_NUTRITION = [
  {
    id: "1",
    date: new Date().toISOString().split("T")[0],
    meal: "Breakfast Bowl",
    calories: 450,
    protein: 25,
    carbs: 50,
    fats: 15,
  },
  {
    id: "2",
    date: new Date().toISOString().split("T")[0],
    meal: "Grilled Chicken Salad",
    calories: 380,
    protein: 35,
    carbs: 20,
    fats: 18,
  },
];

const MOCK_GOALS = [
  {
    id: "1",
    category: "workout" as const,
    target: 150,
    current: 75,
    unit: "minutes",
    startDate: "2024-02-01",
    deadline: "2024-02-29",
  },
  {
    id: "2",
    category: "water" as const,
    target: 2000,
    current: 1750,
    unit: "ml",
    startDate: "2024-02-01",
  },
];

type Tab =
  | "dashboard"
  | "workout"
  | "water"
  | "sleep"
  | "nutrition"
  | "goals"
  | "insights"
  | "about";

export interface WorkoutEntry {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
  notes?: string;
}

export interface WaterEntry {
  id: string;
  date: string;
  amount: number;
  time: string;
}

export interface SleepEntry {
  id: string;
  date: string;
  hours: number;
  quality: "poor" | "fair" | "good" | "excellent";
  notes?: string;
}

export interface NutritionEntry {
  id: string;
  date: string;
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Goal {
  id: string;
  category:
    | "workout"
    | "water"
    | "sleep"
    | "nutrition"
    | "weight";
  target: number;
  current: number;
  unit: string;
  startDate: string;
  deadline?: string;
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("Design Demo");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Using MOCK DATA for design prototype
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>(MOCK_WORKOUTS);
  const [waterEntries, setWaterEntries] = useState<WaterEntry[]>(MOCK_WATER);
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>(MOCK_SLEEP);
  const [nutritionEntries, setNutritionEntries] = useState<NutritionEntry[]>(
    MOCK_NUTRITION,
  );
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // REMOVED: localStorage functionality - this is a design mockup only

  const handleWelcomeComplete = (name: string, goal: string) => {
    setUserName(name);
    setShowWelcome(false);
    // Design prototype - no actual data saving
  };

  // REMOVED: Export/Import functionality - design mockup only

  const navLinks = [
    {
      id: "dashboard" as Tab,
      label: "Home",
      icon: LayoutDashboard,
    },
    { id: "workout" as Tab, label: "Workouts", icon: Activity },
    { id: "water" as Tab, label: "Hydration", icon: Droplets },
    { id: "sleep" as Tab, label: "Sleep", icon: Moon },
    {
      id: "nutrition" as Tab,
      label: "Nutrition",
      icon: Utensils,
    },
    { id: "goals" as Tab, label: "Goals", icon: Target },
    {
      id: "insights" as Tab,
      label: "Insights",
      icon: TrendingUp,
    },
    { id: "about" as Tab, label: "About", icon: Info },
  ];

  if (showWelcome) {
    return <WelcomeModal onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* DESIGN MOCKUP - No install prompt needed */}

      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Zap
                  className="w-7 h-7 text-white"
                  fill="white"
                />
              </div>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                  WellTrack
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* DESIGN MOCKUP - Export/Import disabled for prototype */}

              {/* User Info */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700">
                  {userName}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() =>
                  setShowMobileMenu(!showMobileMenu)
                }
                className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-purple-50 rounded-xl"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-purple-100 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveTab(link.id);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl text-left transition-all flex items-center gap-3 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-gray-600 hover:bg-purple-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </button>
                  );
                })}
                <div className="pt-4 mt-4 border-t border-purple-100 space-y-1">
                  {/* DESIGN MOCKUP - No export/import in mobile menu */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main
        className={
          activeTab === "dashboard"
            ? ""
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        }
      >
        {activeTab === "dashboard" && (
          <Dashboard
            workouts={workouts}
            waterEntries={waterEntries}
            sleepEntries={sleepEntries}
            nutritionEntries={nutritionEntries}
            goals={goals}
          />
        )}
        {activeTab === "workout" && (
          <WorkoutTracker
            workouts={workouts}
            setWorkouts={setWorkouts}
          />
        )}
        {activeTab === "water" && (
          <WaterTracker
            waterEntries={waterEntries}
            setWaterEntries={setWaterEntries}
          />
        )}
        {activeTab === "sleep" && (
          <SleepTracker
            sleepEntries={sleepEntries}
            setSleepEntries={setSleepEntries}
          />
        )}
        {activeTab === "nutrition" && (
          <NutritionTracker
            nutritionEntries={nutritionEntries}
            setNutritionEntries={setNutritionEntries}
          />
        )}
        {activeTab === "goals" && (
          <Goals
            goals={goals}
            setGoals={setGoals}
            workouts={workouts}
            waterEntries={waterEntries}
            sleepEntries={sleepEntries}
            nutritionEntries={nutritionEntries}
          />
        )}
        {activeTab === "insights" && (
          <Insights
            workouts={workouts}
            waterEntries={waterEntries}
            sleepEntries={sleepEntries}
            nutritionEntries={nutritionEntries}
            goals={goals}
          />
        )}
        {activeTab === "about" && <AboutUs />}
      </main>
    </div>
  );
}