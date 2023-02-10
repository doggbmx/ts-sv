export const SELECT_USERS_QUERY = `SELECT * FROM user;`;

export const SELECT_USER_QUERY = `SELECT * FROM public.user WHERE id = $1;`;

export const INSERT_USER_QUERY = `
INSERT INTO public.user (name, email, password, user_type)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;

export const UPDATE_USER_QUERY = `
UPDATE public.user
SET name=$2, email=$3, password=$4, user_type=$5
WHERE id=$1 RETURNING *;
`;

export const SELECT_USER_WITH_TECH = `
SELECT * FROM public.tech t
INNER JOIN user_techs ut
ON t.id = ut.tech_id AND ut.user_id = $1;
`;