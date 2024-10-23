type SuperheroDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: string[] | null;
};

export { SuperheroDto };
