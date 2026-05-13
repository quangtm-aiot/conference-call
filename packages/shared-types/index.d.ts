export declare const UserAuthProvider: {
  readonly LOCAL: "local";
  readonly GOOGLE: "google";
};

export type UserAuthProvider =
  (typeof UserAuthProvider)[keyof typeof UserAuthProvider];

export declare const UserStatus: {
  readonly PENDING: "pending";
  readonly ACTIVE: "active";
  readonly SUSPENDED: "suspended";
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
