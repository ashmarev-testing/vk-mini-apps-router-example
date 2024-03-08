// types.ts
export type NavProp = {
  nav: string;
};

export type GoFunctionProp = {
  go: (path: string) => void;
};

export type UserInfo = {
  photo_200?: string;
  photo_max_orig?: string;
  first_name?: string;
  last_name?: string;
  city?: {
    title?: string;
  };
  country?: {
    title?: string;
  };
  sex: string;
  is_closed: boolean;
  bdate: string;
  bdate_visibility: number;
};

export type CaseItem = {
  id: string;
  point_id: string;
  language: string;
  text: string | null;
};

export type CardItem = {
  text: string;
  geolocation: string;
  dateCreated: string;
  width: number;
  height: number;
};
