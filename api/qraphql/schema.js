const {buildSchema} = require('graphql');


const schema = buildSchema(`
    type User {
        id: ID
        username: String
        password: String
        is_active: Boolean 
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
        time_start: String
        time_duration: String
    }
    
    
    input UserInput {
        id: ID
        username: String
        password: String
        first_name: String
        last_name: String
        is_active: Boolean
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
        event: String
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
        time_start: String
        time_duration: String
    }
    
    
    type Query {
        getUser(id: ID): User
        getUserPersonalParameters(username: String): User 
        getAllClients: [User]
    }
    type Mutation {
        loginUser(input: UserInput): User
        createClient(input: UserInput): User
        
        eventWithParameterClient(input: UserInput): User
        updatePersonalClient(input: PersonalInput): User

        createTrainingDays(input: UserInput): User
    }
`)
module.exports = schema;
