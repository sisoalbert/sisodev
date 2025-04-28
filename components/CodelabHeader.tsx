import React from "react";
import { CodelabData } from "../types";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

interface CodelabHeaderProps {
  data: CodelabData;
}

const CodelabHeader: React.FC<CodelabHeaderProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-6 md:px-12 rounded-lg shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          {data.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6 text-blue-100">
          <div className="flex items-center gap-2">
            <MaterialCommunityIcons
              name="calendar-clock"
              size={18}
              color="rgba(255, 255, 255, 0.8)"
            />
            <span>Last updated: {formatDate(data.lastUpdated)}</span>
          </div>

          <div className="flex items-center gap-2">
            <FontAwesome
              name="users"
              size={18}
              color="rgba(255, 255, 255, 0.8)"
            />
            <span>By: {data.authors.join(", ")}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CodelabHeader;
