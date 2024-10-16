// state mgmt. of user info

export const createAuthSlice = (set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
});