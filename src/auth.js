export function addToRegisterUser(username, password) {
    const users = getRegisteredUsers();
    users.push({ username, password });
    localStorage.setItem('irusriuserRegistered', JSON.stringify(users));
}

export function getRegisteredUsers() {
    return JSON.parse(localStorage.getItem('irusriuserRegistered')) || [];
}

export function getUser() {
    return JSON.parse(localStorage.getItem('irusriuser'));
}

export function setUser(username, password) {
    localStorage.setItem('irusriuser', JSON.stringify({
        username,
        password
    }));
}

export function logout() {
    localStorage.removeItem('irusriuser');
}

export function deleteAccount(username) {
    let users = getRegisteredUsers();
    users = users.filter(user => user.username !== username);
    localStorage.setItem('irusriuserRegistered', JSON.stringify(users));
    logout();
}

export function authCheck() {
    const user = getUser();
    if (!user) {
        return false;
    }
    return true;
}

function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

function validateCredentials(credentials, users) {
    return users.some(user => isEqual(credentials, user));
}

export function login(username, password) {
    const users = getRegisteredUsers();
    if (users.length === 0) {
        return {
            data: {
                ok: false,
                message: 'No users exist'
            }
        };
    }

    const credentialsMatch = validateCredentials({ username, password }, users);

    if (!credentialsMatch) {
        return {
            data: {
                ok: false,
                message: 'Username or password does not match'
            }
        };
    }

    setUser(username, password);

    return {
        data: {
            ok: true,
            message: 'Credentials matched!',
            user: { username }
        }
    };
}

export function userExists(username) {
    const users = getRegisteredUsers();
    return users.some(user => user.username === username);
}


export function register(username, password) {

    const recordExists = userExists(username);

    if (recordExists) {
        return {
            data: {
                ok: false,
                message: 'Credentials already exist!',
            }
        };
    } else {
        addToRegisterUser(username, password);
        return {
            data: {
                ok: true,
                message: 'user registered Successfully',
            }
        };
    }

}