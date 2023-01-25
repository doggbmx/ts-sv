export const SELECT_USERS_QUERY = `SELECT * FROM public.user`

export const SELECT_USER_QUERY = `SELECT * FROM public.user WHERE id = $1`

export const INSERT_USER_QUERY = `
INSERT INTO public.user (name, email, password, user_type)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;