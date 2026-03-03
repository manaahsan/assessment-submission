 
 export const CHART_COLORS = {
  answered: "hsl(142, 71%, 45%)",  
  unanswered: "hsl(0, 84%, 60%)",       
  reflection: "hsl(217, 91%, 60%)",    
  skipped: "hsl(38, 92%, 50%)",         

  elements: [
    "hsl(217, 91%, 60%)",   
    "hsl(142, 71%, 45%)", 
    "hsl(38, 92%, 50%)",
    "hsl(0, 84%, 60%)",
    "hsl(262, 83%, 58%)",
    "hsl(186, 72%, 43%)",
  ],

  gauge: {
    filled: "hsl(0, 84%, 60%)",
    empty: "hsl(210, 40%, 94%)",
  },

  insights: {
    warning: { bg: "hsl(0, 86%, 97%)", border: "hsl(0, 84%, 60%)", text: "hsl(0, 84%, 40%)" },
    positive: { bg: "hsl(142, 76%, 96%)", border: "hsl(142, 71%, 45%)", text: "hsl(142, 71%, 28%)" },
    info: { bg: "hsl(217, 91%, 96%)", border: "hsl(217, 91%, 60%)", text: "hsl(217, 91%, 35%)" },
  },
};

export const STATUS_COLORS: Record<string, string> = {
  answered: CHART_COLORS.answered,
  unanswered: CHART_COLORS.unanswered,
  reflection: CHART_COLORS.reflection,
  skipped: CHART_COLORS.skipped,
};

 export const getScoreConfig = (pct: number) => {
  if (pct >= 80)
    return {
      color: "#0B3C8A", 
      gradient: "linear-gradient(135deg, #073C92 0%, #2563eb 100%)",
      label: "Excellent",
      icon: "🏆",
      bgGlow: "rgba(7, 60, 146, 0.35)",
    };

  if (pct >= 60)
    return {
      color: "#1E40AF",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      label: "Good",
      icon: "⭐",
      bgGlow: "rgba(37, 99, 235, 0.30)",
    };

  if (pct >= 40)
    return {
      color: "#334155",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      label: "Average",
      icon: "📊",
      bgGlow: "rgba(51, 65, 85, 0.30)",
    };

  return {
    color: "#0f172a",
    gradient: "linear-gradient(135deg, hsl(222 47% 11%) 0%, #1e293b 100%)",
    label: "Needs Work",
    icon: "🎯",
    bgGlow: "rgba(15, 23, 42, 0.35)",
  };
};

export const getScoreStatus = (percentage: number) => {
  if (percentage >= 80)
    return {
      label: "Excellent",
      color: "#073C92", 
      icon: "✓",
    };

  if (percentage >= 60)
    return {
      label: "Good",
      color: "#1E40AF",
      icon: "◆",
    };

  if (percentage >= 40)
    return {
      label: "Fair",
      color: "#334155",
      icon: "◐",
    };

  return {
    label: "Needs Work",
      color: "hsl(222 47% 11%)",
      icon: "!",
  };
};

export const getBarGradient = (percentage: number, baseColor: string) => {
  if (percentage >= 80)
    return `linear-gradient(90deg, ${baseColor} 0%, #3B82F6 100%)`;

  if (percentage >= 60)
    return `linear-gradient(90deg, ${baseColor} 0%, #2563EB 100%)`;

  if (percentage >= 40)
    return `linear-gradient(90deg, ${baseColor} 0%, #475569 100%)`;

  return `linear-gradient(90deg, ${baseColor} 0%, #1E293B 100%)`;
};

export const getBarColor = (entry: any) => {
  if (!entry.is_answered) return "#64748b";

  if (entry.percentage >= 80) return "#073C92"; 
  if (entry.percentage >= 60) return "#1E40AF";
  if (entry.percentage >= 40) return "#334155"; 
  return "hsl(222 47% 11%)"; 
};

export const getStatusIcon = (entry: any) => {
  if (!entry.is_answered) return "○";

  if (entry.percentage >= 80) return "●"; 
  if (entry.percentage >= 60) return "◉"; 
  if (entry.percentage >= 40) return "◌"; 
  return "▲"; 
};

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "answered":
      return {
        label: "Answered",
        color: STATUS_COLORS.answered || "#073C92",
        icon: "✓",
        bg: "rgba(7, 60, 146, 0.12)",
      };

    case "unanswered":
      return {
        label: "Unanswered",
        color: STATUS_COLORS.unanswered || "hsl(222 47% 11%)",
        icon: "○",
        bg: "rgba(15, 23, 42, 0.12)",
      };

    case "reflection":
      return {
        label: "Reflection",
        color: STATUS_COLORS.reflection || "#1E40AF", 
        icon: "◉",
        bg: "rgba(30, 64, 175, 0.12)",
      };

    default:
      return {
        label: status,
        color: "#475569", 
        icon: "•",
        bg: "rgba(71, 85, 105, 0.12)",
      };
  }
};


export const getScoreColor = (score: number, max: number) => {
  const pct = max > 0 ? (score / max) * 100 : 0;

  if (pct >= 80) return "#073C92";        
  if (pct >= 60) return "#1E40AF";       
  if (pct >= 40) return "#334155";     
  return "hsl(222 47% 11%)";            
};