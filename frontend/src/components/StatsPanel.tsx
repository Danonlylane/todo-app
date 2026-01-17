import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Star, AlertCircle, TrendingUp } from 'lucide-react';
import { Statistics } from '../services/todoAPI';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`
      relative overflow-hidden rounded-xl p-6 bg-gradient-to-br
      ${color}
      shadow-lg hover:shadow-xl transition-shadow duration-200
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="text-white/30">
        {icon}
      </div>
    </div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
  </motion.div>
);

interface StatsPanelProps {
  stats: Statistics | null;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <TrendingUp className="w-12 h-12" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: <Circle className="w-12 h-12" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="w-12 h-12" />,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'High Priority',
      value: stats.high_priority,
      icon: <AlertCircle className="w-12 h-12" />,
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Starred',
      value: stats.starred,
      icon: <Star className="w-12 h-12" />,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: <AlertCircle className="w-12 h-12" />,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => (
        <StatsCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
};

export default StatsPanel;
