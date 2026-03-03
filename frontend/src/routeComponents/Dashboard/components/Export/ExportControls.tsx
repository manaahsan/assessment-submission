import { Download, Copy, FileText } from "lucide-react";
import toast from 'react-hot-toast';
import "./ExportControls.css";
import { AssessmentResult } from "../../../../lib/types/assessment";

interface ExportControlsProps {
  data: AssessmentResult;
}

const ExportControls = ({ data }: ExportControlsProps) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-${data.instance_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded successfully");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      toast.success("Results copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const exportSummary = () => {
    const lines = [
      `Assessment Results Summary`,
      `==========================`,
      `Instance ID: ${data.instance_id}`,
      `Title: ${data.assessment_title}`,
      `Status: ${data.status}`,
      ``,
      `Score: ${data.total_score}/${data.max_total_score} (${data.percentage.toFixed(2)}%)`,
      `Progress: ${data.answered_questions}/${data.total_questions} questions answered`,
      ``,
      `Element Scores:`,
      ...data.element_scores.map((e) => `  ${e.element}: ${e.percentage}% (${e.score}/${e.max_score})`),
      ``,
      `Questions:`,
      ...data.questions.map((q) => `  [${q.status.toUpperCase()}] ${q.element}: ${q.question_text} — Score: ${q.score}/${q.max_score}`),
      ``,
      `Insights:`,
      ...data.insights.map((i) => `  [${i.type.toUpperCase()}] ${i.message}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-summary-${data.instance_id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Summary downloaded successfully");
  };

  return (
    <div className="export-controls">
      <button className="export-button" onClick={exportJSON}>
        <Download  size={16} color="gray" /> JSON
      </button>
      <button className="export-button" onClick={copyToClipboard}>
        <Copy  size={16} color="gray" /> Copy
      </button>
      <button className="export-button" onClick={exportSummary}>
        <FileText  size={16} color="gray" /> Summary
      </button>
    </div>
  );
};

export default ExportControls;