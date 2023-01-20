import { USERTYPE, User } from '../../domain/models/user_model';

export const userFromPG = (item: any): User => {
    let userType;
    switch (item.user_type) {
        case 'bmx': {
            userType = USERTYPE.BMX;
            break;
        }
        case 'skate': {
            userType = USERTYPE.SKATE;
            break;
        }
        case 'inline': {
            userType = USERTYPE.INLINE
            break;
        }
        default:
            break;
    }
    return {
        userId: item.id,
        name: item.name,
        email: item.email,
        password: item.password,
        userType: userType
    }
}