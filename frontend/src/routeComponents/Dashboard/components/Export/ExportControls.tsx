import { Download, Copy, FileText } from "lucide-react";
import toast from "react-hot-toast";

// css
import "./ExportControls.css";
// types
import { AssessmentResult } from "../../../../lib/types/assessment";

interface ExportControlsProps {
  data: AssessmentResult;
}

const ExportControls = ({ data }: ExportControlsProps) => {
  console.log(data)
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-${data.instance.id}.json`;
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
    `# Assessment Results Summary`,
    ``,
    `**Instance ID:** ${data.instance.id}`,
    `**Responder Name:** ${data.instance.responder_name}`,
    `**Element:** ${data.instance.element}`,
    `**Completed:** ${data.instance.completed ? "Yes" : "No"}`,
    data.instance.completed_at ? `**Completed At:** ${data.instance.completed_at}` : "",
    ``,
    `**Total Questions:** ${data.total_questions}`,
    `**Answered Questions:** ${data.answered_questions}`,
    `**Completion Percentage:** ${data.completion_percentage}%`,
    ``,
    `## Scores`,
    `**Total Score:** ${data.scores.total_score} / ${data.scores.max_score} (${data.scores.percentage.toFixed(2)}%)`,
    ``,
    `## Element Scores`,
  ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-summary-${data.instance.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Summary downloaded successfully");
  };

  return (
    <div className="export-controls">
      <button className="export-button" onClick={exportJSON}>
        <Download size={16} /> JSON
      </button>
      <button className="export-button" onClick={copyToClipboard}>
        <Copy size={16} /> Copy
      </button>
      <button className="export-button" onClick={exportSummary}>
        <FileText size={16} /> Summary
      </button>
    </div>
  );
};

export default ExportControls;
