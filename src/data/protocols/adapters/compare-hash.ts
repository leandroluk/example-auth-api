export type CompareHashAdapter = {
  compare(args: CompareHashAdapter.Args): Promise<CompareHashAdapter.Result>;
};
export namespace CompareHashAdapter {
  export type Args = {
    plain: string;
    hashed: string;
  };
  export type Result = boolean;
}