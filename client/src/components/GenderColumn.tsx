import React from "react";

interface GenderColumnProps {
  gender: string;
  src: string;
  children?: React.ReactNode;
  count?: number;
}

const GenderColumn: React.FC<GenderColumnProps> = (props) => {
  const { gender, src, children, count } = props;
  return (
    <div className="space-y-2">
      <img src={src} height={128} width={128} alt={gender} />
      <p className="text-center text-lg font-bold">{gender}</p>

      {count && (
        <p className="px-2 py-1.5 border rounded-lg text-center text-lg font-bold">
          {count}
        </p>
      )}

      {children}
    </div>
  );
};

export default GenderColumn;
