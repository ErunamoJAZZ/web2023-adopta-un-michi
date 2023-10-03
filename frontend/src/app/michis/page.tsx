// Jona
import MichiCard from '../../components/michiCard';

import cats from './mockedData';

interface Cat {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  age: number | null;
  personality: string | null;
  sex: string;
  health_state: string;
  is_available: boolean;
  added_at: string;
  updated_at: string | null;
}

export default function Michis() {
  return (
    <main>
      Michis
      <ul>
        {cats.cats.map((cat: Cat) => (
          <li key={cat.id}>
            <MichiCard
              name={cat.name}
              description={cat.description}
              image_url={cat.image_url}
              age={cat.age}
              personality={cat.personality}
              sex={cat.sex}
              health_state={cat.health_state}
              is_available={cat.is_available}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
