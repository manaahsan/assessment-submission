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
