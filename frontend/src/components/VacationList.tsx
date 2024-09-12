import React, { useState, useEffect } from 'react';
import { getVacations } from '../api/vacationsApi';

interface Vacation {
  id: number;
  destination: string;
  description: string;
}

const VacationList: React.FC = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await getVacations();
        setVacations(response);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch vacations');
        setLoading(false);
      }
    };

    fetchVacations();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {vacations.map((vacation) => (
        <li key={vacation.id}>
          <h2>{vacation.destination}</h2>
          <p>{vacation.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default VacationList;