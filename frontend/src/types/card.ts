export type UserCard = {
  title: string;
  description: string;
  score: number;
  id: string;
};

export type UserCardWithoutId = Omit<UserCard, "id">;

export type Card = UserCard & {
  author: string;
};
export type CardWithoutId = Omit<Card, "id">;

export type CardWithMeta = Card & {
  numberOfGames: number;
  numberOfAppearances: number;
  numberOfCorrectAnswers: number;
};
