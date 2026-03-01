import { QuestionFilter, SortOption } from "../../../../lib/types/assessment";

interface FilterControlsProps {
  filter: QuestionFilter;
  sort: SortOption;
  onFilterChange: (f: QuestionFilter) => void;
  onSortChange: (s: SortOption) => void;
}

const FilterControls = ({ filter, sort, onFilterChange, onSortChange }: FilterControlsProps) => {
  return (
    <div className="filter-controls">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as QuestionFilter)}
        className="filter-select"
      >
        <option value="all">All Questions</option>
        <option value="answered">Answered</option>
        <option value="unanswered">Unanswered</option>
        <option value="reflection">Reflection</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="filter-select"
      >
        <option value="default">Default Order</option>
        <option value="score-desc">Score (High → Low)</option>
        <option value="score-asc">Score (Low → High)</option>
        <option value="status">Status</option>
        <option value="element">Element</option>
      </select>
    </div>
  );
};

export default FilterControls;