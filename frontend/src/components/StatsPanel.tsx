import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Star, AlertCircle, TrendingUp } from 'lucide-react';
import { Statistics } from '../services/todoAPI';
import { useLanguage } from '../i18n/LanguageContext';

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
      relative overflow-hidden rounded-xl p-3 bg-gradient-to-br
      ${color}
      shadow-lg hover:shadow-xl transition-shadow duration-200
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-white/80 mb-0.5">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
      <div className="text-white/30">
        {icon}
      </div>
    </div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
  </motion.div>
);

interface StatsPanelProps {
  stats: Statistics | null;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const { t } = useLanguage();

  if (!stats) return null;

  const cards = [
    {
      title: t('totalTasks'),
      value: stats.total,
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: t('active'),
      value: stats.active,
      icon: <Circle className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: t('completed'),
      value: stats.completed,
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
    },
    {
      title: t('highPriority'),
      value: stats.high_priority,
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
    },
    {
      title: t('starred'),
      value: stats.starred,
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: t('overdue'),
      value: stats.overdue,
      icon: <AlertCircle className="w-8 h-8" />,
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
