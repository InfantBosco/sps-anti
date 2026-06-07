'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Zap, BookOpen, Users, Award, Target } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Excellence Award',
    icon: <Trophy className="w-8 h-8" />,
    description: 'Top academic performer',
    color: 'from-yellow-400 to-orange-400'
  },
  {
    id: 2,
    title: 'Sports Champion',
    icon: <Medal className="w-8 h-8" />,
    description: 'Inter-school winner',
    color: 'from-red-400 to-pink-400'
  },
  {
    id: 3,
    title: 'Star Performer',
    icon: <Star className="w-8 h-8" />,
    description: 'Outstanding achievement',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 4,
    title: 'Innovation Leader',
    icon: <Zap className="w-8 h-8" />,
    description: 'Creative excellence',
    color: 'from-purple-400 to-pink-400'
  },
  {
    id: 5,
    title: 'Scholar',
    icon: <BookOpen className="w-8 h-8" />,
    description: 'Academic excellence',
    color: 'from-green-400 to-teal-400'
  },
  {
    id: 6,
    title: 'Leadership',
    icon: <Users className="w-8 h-8" />,
    description: 'Student council lead',
    color: 'from-indigo-400 to-blue-400'
  },
  {
    id: 7,
    title: 'All-Rounder',
    icon: <Award className="w-8 h-8" />,
    description: 'Multiple achievements',
    color: 'from-amber-400 to-orange-400'
  },
  {
    id: 8,
    title: 'Goal Achiever',
    icon: <Target className="w-8 h-8" />,
    description: 'Target completion',
    color: 'from-lime-400 to-green-400'
  }
];

export default function AchievementsBadgeGrid() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-widest">
            Recognition
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Student Achievements
          </h3>
          <p className="text-gray-600 mt-2">Badges earned by our outstanding students</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${achievement.color} rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-white`}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 p-3 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all duration-300">
                    {achievement.icon}
                  </div>
                  <h4 className="font-bold text-sm md:text-base mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs md:text-sm text-white text-opacity-90">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
