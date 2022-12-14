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
        schedules: [Schedule]
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
        date_metering: Float
    }
    type Schedule {
        id: ID
        date: Float
        description: String
    }
    
    
    input UserInput {
        id: ID
        username: String
        password: String
        first_name: String
        last_name: String
        roleId: Int
        personal: PersonalInput
        parameters: ParameterInput
        schedules: [ScheduleInput]
    }
    input PersonalInput {
        id: ID
        gender: Int
        height: Int
        birth_day: Float
        start_train: Float
    }
    input ParameterInput {
        id: ID
        weight: Int
        shoulder_bust: Int
        shoulder_girth: Int
        shoulder_hips: Int
        shoulder_hip: Int
        date_metering: Float
    }
    input ScheduleInput {
        id: ID
        date: Float
        description: String
    }
    
    
    type Query {
        getUser(id: ID): User
        getUserPersonalParameters(username: String): User 
        getAllClients: [User]
    }
    type Mutation {
        createUser(input: UserInput): User
        loginUser(input: UserInput): User
        createClient(input: UserInput): User
        createParametersClient(input: UserInput): User

        createTrainingDays(input: UserInput): User
    }
`)
module.exports = schema;