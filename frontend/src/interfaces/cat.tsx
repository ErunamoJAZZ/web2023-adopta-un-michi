export default interface ICat {
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
