type SuperheroCreateUpdateDto = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: string[] | null;
};

export { type SuperheroCreateUpdateDto };
