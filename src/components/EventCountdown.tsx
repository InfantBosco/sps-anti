'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  date: Date;
  description: string;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const events: Event[] = [
  {
    id: 1,
    name: "Annual Sports Day",
    date: new Date(2026, 6, 15), // July 15, 2026
    description: "Celebrate athletic excellence and team spirit"
  },
  {
    id: 2,
    name: "Science Exhibition",
    date: new Date(2026, 8, 20), // September 20, 2026
    description: "Showcase innovative projects and discoveries"
  },
  {
    id: 3,
    name: "Annual Day Celebration",
    date: new Date(2026, 10, 28), // November 28, 2026
    description: "A grand celebration of achievements and talents"
  },
  {
    id: 4,
    name: "Board Exam Results",
    date: new Date(2026, 4, 15), // May 15, 2026
    description: "Class 10 & 12 board exam results announcement"
  }
];

const CountdownDisplay = ({ countdown }: { countdown: Countdown }) => {
  const timeUnits = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {timeUnits.map((unit, idx) => (
        <div key={idx} className="text-center">
          <div className="bg-indigo-600 text-white rounded-lg p-3 md:p-4 font-bold text-lg md:text-2xl">
            {String(unit.value).padStart(2, '0')}
          </div>
          <p className="text-xs md:text-sm text-gray-600 mt-2 font-semibold">{unit.label}</p>
        </div>
      ))}
    </div>
  );
};

export default function EventCountdown() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [selectedEventId, setSelectedEventId] = useState(1);

  useEffect(() => {
    const calculateCountdowns = () => {
      const now = new Date();
      const newCountdowns = events.map(event => {
        const diff = event.date.getTime() - now.getTime();
        const isExpired = diff <= 0;

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days: Math.max(0, days), hours, minutes, seconds, isExpired };
      });
      setCountdowns(newCountdowns);
    };

    calculateCountdowns();
    const interval = setInterval(calculateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const selectedCountdown = countdowns[events.findIndex(e => e.id === selectedEventId)];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-widest">
            Upcoming Events
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Event Countdown
          </h3>
          <p className="text-gray-600">Stay tuned for these exciting events</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {events.map((event, idx) => (
            <motion.button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                selectedEventId === event.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <Calendar className={`w-5 h-5 mt-1 flex-shrink-0 ${
                  selectedEventId === event.id ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                    {event.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedEvent && selectedCountdown && (
          <motion.div
            key={selectedEventId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg"
          >
            <div className="mb-6">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {selectedEvent.name}
              </h4>
              <p className="text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedEvent.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-gray-600 mt-2">{selectedEvent.description}</p>
            </div>

            {selectedCountdown.isExpired ? (
              <div className="text-center py-6 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-700">Event has started!</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4 font-medium">Time Remaining:</p>
                <CountdownDisplay countdown={selectedCountdown} />
              </>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
