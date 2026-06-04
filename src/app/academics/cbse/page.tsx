"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Lightbulb, Compass, Award } from "lucide-react";

const categories = [
  {
    id: "cat-1-2",
    title: "Category I & II",
    subtitle: "Foundational Years",
    icon: <Lightbulb className="w-8 h-8" />,
    description: "The early years are crucial for establishing a strong foundation. Our curriculum for Classes I and II focuses on interactive, play-based learning that fosters curiosity, basic literacy, numeracy, and social skills in a nurturing environment.",
    color: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-900"
  },
  {
    id: "cat-3-5",
    title: "Category III to V",
    subtitle: "Preparatory Phase",
    icon: <Compass className="w-8 h-8" />,
    description: "As students transition into primary education, the focus shifts towards structured learning. We introduce core subjects with an emphasis on conceptual clarity, creative expression, and environmental awareness.",
    color: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-900"
  },
  {
    id: "cat-6-8",
    title: "Category VI to VIII",
    subtitle: "Middle School Phase",
    icon: <BookOpen className="w-8 h-8" />,
    description: "The middle school years are about exploration and critical thinking. The curriculum broadens to include specialized subjects, practical lab work, and project-based learning to prepare them for higher academic challenges.",
    color: "from-purple-500/20 to-fuchsia-500/20",
    textColor: "text-purple-900"
  },
  {
    id: "cat-9-10",
    title: "Category IX & X",
    subtitle: "Secondary Phase",
    icon: <Target className="w-8 h-8" />,
    description: "In the secondary phase, academics become more rigorous and focused. We provide intensive preparation for board examinations, comprehensive career counseling, and advanced analytical skill development.",
    color: "from-orange-500/20 to-red-500/20",
    textColor: "text-orange-900"
  },
  {
    id: "cat-11-12",
    title: "Category XI & XII",
    subtitle: "Senior Secondary Phase",
    icon: <Award className="w-8 h-8" />,
    description: "The final phase prepares students for their future careers and higher education. We offer specialized streams (Science, Commerce) with expert faculty, rigorous test series, and competitive exam coaching.",
    color: "from-luxury-gold/30 to-yellow-500/20",
    textColor: "text-royal-brown"
  }
];

export default function CBSEPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[50vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover bg-center opacity-[0.05] mix-blend-luminosity" />
        {/* Gradient Overlay - Ivory to transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-luxury-gold/30 text-luxury-gold text-sm tracking-widest uppercase mb-6">
              Curriculum Excellence
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
              CBSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Curriculum</span>
            </h1>
            <p className="text-lg text-ivory/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Our CBSE curriculum is meticulously designed to provide a holistic educational journey from Class I to XII, 
              fostering intellectual growth, critical thinking, and character building at every stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How CBSE is Taught */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl font-bold text-royal-brown mb-6">How CBSE is Taught Here</h2>
              <div className="w-20 h-1 bg-luxury-gold mb-8" />
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ivory-dark flex items-center justify-center text-royal-brown shrink-0 shadow-sm border border-royal-brown/5">
                    <span className="font-bold font-serif text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-royal-brown mb-2">Experiential Learning</h4>
                    <p className="text-royal-brown-light leading-relaxed">We move beyond rote memorization. Concepts are taught through hands-on activities, real-world applications, and practical lab sessions to ensure deep comprehension.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ivory-dark flex items-center justify-center text-royal-brown shrink-0 shadow-sm border border-royal-brown/5">
                    <span className="font-bold font-serif text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-royal-brown mb-2">Technology Integration</h4>
                    <p className="text-royal-brown-light leading-relaxed">Smart classrooms, digital resources, and interactive modules are seamlessly integrated into daily lessons to make learning engaging and modern.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ivory-dark flex items-center justify-center text-royal-brown shrink-0 shadow-sm border border-royal-brown/5">
                    <span className="font-bold font-serif text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-royal-brown mb-2">Continuous Evaluation</h4>
                    <p className="text-royal-brown-light leading-relaxed">Regular formative assessments, quizzes, and project evaluations ensure that students' progress is continuously monitored without the stress of singular high-stakes exams.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 h-[500px]"
            >
              <div className="space-y-4 h-full pt-10">
                <div className="h-1/2 w-full rounded-3xl bg-royal-brown/10 relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-brown/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="w-full h-full flex items-center justify-center text-royal-brown/30 font-serif italic group-hover:scale-110 transition-transform duration-700 bg-ivory-light">
                    [Teaching Image 1]
                  </div>
                </div>
                <div className="h-1/2 w-full rounded-3xl bg-luxury-gold/10 relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-brown/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="w-full h-full flex items-center justify-center text-luxury-gold/50 font-serif italic group-hover:scale-110 transition-transform duration-700 bg-ivory-dark">
                    [Teaching Image 2]
                  </div>
                </div>
              </div>
              <div className="space-y-4 h-full pb-10">
                <div className="h-[60%] w-full rounded-3xl bg-royal-brown/20 relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-brown/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="w-full h-full flex items-center justify-center text-white/50 font-serif italic group-hover:scale-110 transition-transform duration-700 bg-royal-brown/50">
                    [Teaching Image 3]
                  </div>
                </div>
                <div className="h-[40%] w-full rounded-3xl bg-ivory-dark relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-brown/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="w-full h-full flex items-center justify-center text-royal-brown/30 font-serif italic group-hover:scale-110 transition-transform duration-700 bg-ivory">
                    [Teaching Image 4]
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Breakdown */}
      <section className="py-24 bg-ivory-light">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl font-bold text-royal-brown mb-4">Academic Categories</h2>
            <p className="text-royal-brown-light max-w-2xl mx-auto">
              Our structured approach ensures age-appropriate academic rigor and personal development.
            </p>
          </div>

          <div className="space-y-32">
            {categories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col gap-12 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} ${category.textColor} shadow-sm`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-royal-brown">{category.title}</h3>
                    <p className="text-luxury-gold font-bold tracking-widest uppercase text-sm mt-2">{category.subtitle}</p>
                  </div>
                  <p className="text-royal-brown-light text-lg leading-relaxed">{category.description}</p>
                  
                  {/* Glassmorphic List items */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white/60 backdrop-blur-sm border border-royal-brown/5 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                        <span className="text-sm font-medium text-royal-brown">Key Focus {i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="flex-1 flex gap-4 h-[400px]">
                  <div className={`w-1/2 h-full rounded-3xl overflow-hidden relative group shadow-xl ${index % 2 === 0 ? 'mt-12' : 'mb-12'}`}>
                    <div className="absolute inset-0 bg-royal-brown/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <div className="w-full h-full bg-white flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                      <span className="text-royal-brown-light font-serif italic text-sm px-4 text-center">[{category.title} Image 1]</span>
                    </div>
                  </div>
                  <div className={`w-1/2 h-full rounded-3xl overflow-hidden relative group shadow-xl ${index % 2 === 0 ? 'mb-12' : 'mt-12'}`}>
                    <div className="absolute inset-0 bg-royal-brown/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <div className="w-full h-full bg-ivory-dark flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                      <span className="text-royal-brown/50 font-serif italic text-sm px-4 text-center">[{category.title} Image 2]</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      </main>
  );
}

