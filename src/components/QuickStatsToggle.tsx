'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Award, Building2, ChevronDown } from 'lucide-react';

interface StatCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  stats: Array<{
    title: string;
    value: string;
    description: string;
  }>;
}

const statCategories: StatCategory[] = [
  {
    id: 'students',
    label: 'Students',
    icon: <Users className="w-6 h-6" />,
    stats: [
      { title: 'Total Students', value: '2,500+', description: 'Across all classes' },
      { title: 'Average Class Size', value: '35-40', description: 'Personalized attention' },
      { title: 'Graduation Rate', value: '98%', description: 'Yearly success rate' }
    ]
  },
  {
    id: 'academics',
    label: 'Academics',
    icon: <BookOpen className="w-6 h-6" />,
    stats: [
      { title: 'Subjects Offered', value: '50+', description: 'Diverse curriculum' },
      { title: 'Pass Rate', value: '96%', description: 'Board exams' },
      { title: 'Average Score', value: '85%', description: 'Class performance' }
    ]
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: <Award className="w-6 h-6" />,
    stats: [
      { title: 'National Awards', value: '45+', description: 'Student achievements' },
      { title: 'Sports Medals', value: '120+', description: 'Inter-school competitions' },
      { title: 'Competitions Won', value: '200+', description: 'Various levels' }
    ]
  },
  {
    id: 'facilities',
    label: 'Facilities',
    icon: <Building2 className="w-6 h-6" />,
    stats: [
      { title: 'Classrooms', value: '80+', description: 'Modern & equipped' },
      { title: 'Labs', value: '12', description: 'Science & computer labs' },
      { title: 'Sports Courts', value: '8', description: 'Outdoor facilities' }
    ]
  }
];

export default function QuickStatsToggle() {
  const [expandedCategory, setExpandedCategory] = useState(statCategories[0].id);

  const activeCategory = statCategories.find(cat => cat.id === expandedCategory)!;

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-widest">
            By The Numbers
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Quick Stats Overview
          </h3>
          <p className="text-gray-600 mt-2">Click on categories to explore our achievements</p>
        </motion.div>

        {/* Category Toggle Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {statCategories.map((category, idx) => (
            <motion.button
              key={category.id}
              onClick={() => setExpandedCategory(category.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                expandedCategory === category.id
                  ? 'border-indigo-600 bg-white shadow-lg'
                  : 'border-gray-200 bg-white hover:border-indigo-400 hover:shadow-md'
              }`}
            >
              <div
                className={`transition-colors duration-300 ${
                  expandedCategory === category.id ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {category.icon}
              </div>
              <span
                className={`text-sm font-semibold transition-colors duration-300 ${
                  expandedCategory === category.id ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                {category.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Stats Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={expandedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {activeCategory.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-all duration-300"
                >
                  <div className="mb-3">
                    <p className="text-4xl md:text-5xl font-bold text-indigo-600 mb-1">
                      {stat.value}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {stat.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:hidden"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <ChevronDown className="w-4 h-4 animate-bounce" />
            <span>Tap categories to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
