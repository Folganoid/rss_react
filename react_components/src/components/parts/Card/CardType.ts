export type CardData = {
  data: CardEntity;
};

export type CardEntity = {
  id: number;
  image: string;
  name: string;
  year: string;
  desc: string;
  license: string;
  site: string;
};
