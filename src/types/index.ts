// Weather Types
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
}

// Country Types
export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  area: number;
  cca2: string;
  timezones: string[];
}

// RandomUser Types
export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
    street: {
      name: string;
      number: number;
    };
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    username: string;
  };
  dob: {
    age: number;
  };
  nat: string;
}

// Book Types
export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  number_of_pages_median?: number;
  subject?: string[];
  language?: string[];
  ratings_average?: number;
  ratings_count?: number;
}

// CatFact Types
export interface CatFact {
  fact: string;
  length: number;
}
