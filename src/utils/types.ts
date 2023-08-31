export type FirstArgumentOf<Fn> = Fn extends (arg1: infer U, arg2: any) => any ? U : never;
