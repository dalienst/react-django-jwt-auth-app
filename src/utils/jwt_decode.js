// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const jwtDecode = (token) => {
    if (token) {
        const decoded = jwt_decode(token);
        return decoded.user_id;
    }
    return undefined;
};

export default jwtDecode;