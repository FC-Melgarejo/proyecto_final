class UserDTO {
    constructor(name, lastname, email, isAdmin) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}

module.exports = UserDTO;
