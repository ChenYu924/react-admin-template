enum UserType {
  OTHER = "0",
  ROLE_1 = "1",
  ROLE_2 = "2",
  GUEST = "9",
}

export default UserType;

export const UserTypeMap = {
  [UserType.OTHER]: "其他",
  [UserType.ROLE_1]: "角色1",
  [UserType.ROLE_2]: "角色2",
  [UserType.GUEST]: "游客",
};
