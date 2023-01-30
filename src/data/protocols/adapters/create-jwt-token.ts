export type CreateJwtTokenAdapter = {
  create(data: CreateJwtTokenAdapter.Data): Promise<CreateJwtTokenAdapter.Result>;
};
export namespace CreateJwtTokenAdapter {
  export type Data = {
    subject: string;
    expires: number;
  };
  export type Result = string;
}