/**
 * Handles authenticating the user on the frontend
 */
class Auth {

    /**
     * Handles requesting the server for a new token
     * @param username
     * @param password
     * @returns {Promise<Response>}
     */
    static serialize(username, password) {
        return fetch('/auth', {
            method:'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        }).then(token => {
            return token.json();
        }).catch(err => {
            return err;
        });
    };

    /**
     * Handles deserializing a user from a token
     * @param token
     * @returns {Promise<Response>}
     */
    static deserialize(token) {
        return fetch('/deserialize', {
            method:'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token})
        }).then(user => {
            return user.json();
        }).catch(err => {
            return err;
        });
    }
}

module.exports = Auth;