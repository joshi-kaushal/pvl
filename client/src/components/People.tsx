import React, { useEffect, useState } from "react";
import { PEOPLE } from "../constants";
import GenderColumn from "./GenderColumn";
import DoughnutChart from "./DoughnutChart";

interface Person {
  id: number;
  name: string;
  gender: "Male" | "Female" | "Boy" | "Girl";
}

const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const token = "112224444_jwt";

      try {
        const response = await fetch(`http://localhost:3001/api/people`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data: Person[] = await response.json();

        setPeople(data);
      } catch (err) {
        setError("Error fetching people data");
        alert("Something went wrong while fetching people's data");
      } finally {
      }
    };
    fetchPeople();
  }, []);

  const counts: Record<string, number> = people.reduce(
    (acc, person) => {
      acc[person.gender]++;
      return acc;
    },
    { Male: 0, Female: 0, Boy: 0, Girl: 0 }
  );

  return (
    <>
      {error && (
        <div className="w-fit bg-red-500 text-lg text-white text-center rounded-lg font-semibold">
          ERROR: {error}
        </div>
      )}
      <div className="container min-h-screen mx-auto px-4 flex items-center justify-center gap-4">
        <div className="grid gap-16 place-content-center grid-cols-1 md:grid-cols-4">
          {PEOPLE.map((person) => (
            <GenderColumn
              key={person.gender}
              gender={person.gender}
              src={person.source}
              count={counts[person.gender] || 0}
            />
          ))}
        </div>

        {/* <DoughnutChart counts={counts} /> */}
      </div>
    </>
  );
};

export default People;
