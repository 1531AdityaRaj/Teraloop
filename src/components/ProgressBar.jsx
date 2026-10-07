import React from 'react';

/**
 * ProgressBar Component
 * Displays real-time completion percentage and visual status badges for each form section.
 *
 * Props:
 * - percentage: number (0 - 100)
 * - sectionStatus: Array<{ id, name, isComplete, filledCount, totalCount }>
 */
function ProgressBar({ percentage = 0, sectionStatus = [] }) {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <div className="progress-title-wrap">
          <span className="progress-label">Onboarding Progress</span>
          <span className="progress-badge">
            {percentage === 100 ? '🎉 Ready to Save' : `${percentage}% Completed`}
          </span>
        </div>
        <span className="progress-detail">
          {sectionStatus.filter((s) => s.isComplete).length} of {sectionStatus.length} Sections Completed
        </span>
      </div>

      {/* Visual Progress Bar Track */}
      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Section Step Chips */}
      <div className="progress-steps">
        {sectionStatus.map((section, index) => (
          <div
            key={section.id}
            className={`progress-step-item ${section.isComplete ? 'completed' : section.filledCount > 0 ? 'in-progress' : ''}`}
          >
            <span className="step-circle">
              {section.isComplete ? '✓' : index + 1}
            </span>
            <span className="step-text">{section.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
