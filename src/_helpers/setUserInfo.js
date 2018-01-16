// Set user info from request
export const setUserInfo = (user) => {
  return {
    _id: user._id,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    phone: user.profile.phone,
    gender: user.profile.gender,
    email: user.email,
    role: user.role
  };
};

// before sending to the api
export const sentUserInfo = (user) => {
  return {
    _id: user._id,
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      gender: user.gender,
    },
    email: user.email,
    role: user.role
  };
}
