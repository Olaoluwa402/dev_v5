export const serialize = (user) => {
  const {
    _id,
    firstName,
    lastName,
    username,
    email,
    address,
    role,
    In_Stock,
    phoneNumber,
    ...rest
  } = user;
  return {
    _id,
    firstName,
    lastName,
    username,
    email,
    address,
    role,
    In_Stock,
    phoneNumber,
  };
};
