// Authentication integration point. Keep access/refresh tokens in secure backend-managed cookies when possible.
export const auth={async getUser(){return null},async login(){throw new Error('Connect /api/auth/login in the backend before enabling login.')}};
