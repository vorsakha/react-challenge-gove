export interface SearchStateTypes {
  searchData:
    | {
        gender: string;
        name: {
          first: string;
          last: string;
        };
        dob: {
          date: string;
        };
        email: string;
        picture: {
          large: string;
        };
        nat: string;
        phone: string;
        location: {
          street: {
            number: number;
            name: string;
          };
          city: string;
          state: string;
          country: string;
        };
        login: { salt: string };
      }[]
    | [];
}

interface SliceTypes {
  data:
    | {
        gender: string;
        name: {
          first: string;
          last: string;
        };
        dob: {
          date: string;
        };
        email: string;
        picture: {
          large: string;
        };
        nat: string;
        phone: string;
        location: {
          street: {
            number: number;
            name: string;
          };
          city: string;
          state: string;
          country: string;
        };
        login: { salt: string };
      }[]
    | [];
  loading: boolean;
}

export type ArrayTypes = {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  dob: {
    date: string;
  };
  email: string;
  picture: {
    large: string;
  };
  nat: string;
  phone: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  login: { salt: string };
}[];

interface DetailedData {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  dob: {
    date: string;
  };
  email: string;
  picture: {
    large: string;
  };
  nat: string;
  phone: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  login: { salt: string };
}
