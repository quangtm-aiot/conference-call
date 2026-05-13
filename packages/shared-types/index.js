"use strict";

const UserAuthProvider = {
  LOCAL: "local",
  GOOGLE: "google",
};

const UserStatus = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
};

module.exports = {
  UserAuthProvider,
  UserStatus,
};
