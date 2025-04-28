export interface Pokemon {
    id: number;
    name: string;
    types: {
      type: {
        name: string;
      };
    }[];
    sprites: {
      front_default: string;
    };
  }
  