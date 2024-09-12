import React from 'react';
import { useParams } from 'react-router-dom';
import { getVacation } from '../api/vacationsApi';

interface Vacation {
  id: number;
  title: string;
  description: string;
}

const VacationDetails: React.FC = () => {
  const { id } = useParams();
  const [vacation, setVacation] = React.useState<Vacation | null>(null);

  React.useEffect(() => {
    const fetchVacation = async () => {
      const vacationData = await getVacation(Number(id));
      setVacation(vacationData);
    };
    fetchVacation();
  }, [id]);

  if (!vacation) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{vacation.title}</h1>
      <p>{vacation.description}</p>
    </div>
  );
};

export default VacationDetails;