export const SELECT_USERS_QUERY = `SELECT * FROM public.user;`;

export const SELECT_USER_QUERY = `SELECT * FROM public.user WHERE id = $1;`;

export const SELECT_USER_BY_EMAIL = `SELECT * FROM public.user WHERE email = $1 LIMIT 1;`;

export const INSERT_USER_QUERY = `
INSERT INTO public.user (username, email, password)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const UPDATE_USER_QUERY = `
UPDATE public.user
SET username=$2, email=$3, password=$4, recovery_token=$5
WHERE id=$1 RETURNING *;
`;

export const SELECT_USER_WITH_TECH = `
SELECT * FROM public.tech t
INNER JOIN user_techs ut
ON t.id = ut.tech_id AND ut.user_id = $1;
`;

export const INSERT_USER_TECH = `
INSERT INTO public.user_techs (user_id, tech_id)
VALUES ($1, $2)
RETURNING *;
`;
