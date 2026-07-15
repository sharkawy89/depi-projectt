import React from 'react';

const PageHeader = ({ description, action }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
