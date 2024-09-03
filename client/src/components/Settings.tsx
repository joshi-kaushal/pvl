import React, { useState } from "react";
import { PEOPLE } from "../constants";
import GenderColumn from "./GenderColumn";

const UserInputForm: React.FC<{
  onSubmit: (name: string, age: number) => void;
}> = ({ onSubmit }) => {
  const [age, setAge] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, age);
    setName("");
    setAge(0);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        className="form-input block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        value={age}
        placeholder="Age"
        pattern="[0-9]*"
        className="form-input block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={(e) => setAge(Number(e.target.value))}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-300 transition-all duration-300 ease-in-out rounded-lg text-white py-2 px-2"
      >
        Submit
      </button>
    </form>
  );
};

const Settings: React.FC = () => {
  const handleOnSubmit = async (name: string, age: number, gender: string) => {
    await fetch(`http://localhost:3001/api/people`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, gender, age }),
    });
  };

  return (
    <div className="container min-h-screen mx-auto px-4 flex items-center justify-center gap-4">
      <div className="grid gap-16 place-content-center grid-cols-1 md:grid-cols-4">
        {PEOPLE.map((person) => (
          <GenderColumn
            key={person.gender}
            gender={person.gender}
            src={person.source}
          >
            <UserInputForm
              onSubmit={(name, age) => handleOnSubmit(name, age, person.gender)}
            />
          </GenderColumn>
        ))}
      </div>
    </div>
  );
};

export default Settings;
