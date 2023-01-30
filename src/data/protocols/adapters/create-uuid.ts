export type CreateUuidAdapter = {
  create(): Promise<CreateUuidAdapter.Result>;
};
export namespace CreateUuidAdapter {
  export type Result = string;
}