export interface Pokemon {
  name: string;
  height: number;
  id: number;
  back_default: string | null;
  front_default: string | null;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}
