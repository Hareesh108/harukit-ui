import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
      <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
        <Icon className="w-6 h-6 text-yellow-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};
