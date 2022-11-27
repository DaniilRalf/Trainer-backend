const {buildSchema} = require('graphql');


const schema = buildSchema(`
    type User {
        id: ID
        username: String
        password: String
        token: String
        first_name: String
        last_name: String
        roleId: Int
        role: Role
        personal: Personal
        parameters: [Parameter]
    }
    type Role {
        id: ID
        value: String
    }
    type Personal {
        id: ID
        gender: Int
        height: Int
        birth_day: Float
        start_train: Float
    }
    type Parameter {
        id: ID
        weight: Int
        shoulder_bust: Int
        shoulder_girth: Int
        shoulder_hips: Int
        shoulder_hip: Int
        date_metering: Int
    }
    
    
    input UserInput {
        id: ID
        username: String
        password: String
        first_name: String
        last_name: String
        roleId: Int
        personal: PersonalInput
    }
    input PersonalInput {
        id: ID
        gender: Int
        height: Int
        birth_day: Float
        start_train: Float
    }
    
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getUserPersonalParameters(username: String): User 
    }
    type Mutation {
        createUser(input: UserInput): User
        loginUser(input: UserInput): User
        createClient(input: UserInput): User
    }
`)
module.exports = schema;