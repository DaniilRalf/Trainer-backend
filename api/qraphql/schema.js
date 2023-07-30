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
        photos: [Photo]
        feed: Feed
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
    type Photo {
       id: ID
       file_name: String
       date: Float
       angle: String
       type: Int
    }
    type Feed {
        id: ID
        protein: String
        fat: String
        carbohydrates: String
        recommendation: String
    }
    
    
    input UserInput {
        id: ID
        active: Boolean
        username: String
        password: String
        first_name: String
        last_name: String
        is_active: Boolean
        roleId: Int
        personal: PersonalInput
        parameters: ParameterInput
        schedules: [ScheduleInput]
        feed: FeedInput
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
    input FeedInput {
        id: ID
        protein: String
        fat: String
        carbohydrates: String
        recommendation: String
    }
    
    
    type Query {
        getUser(id: ID): User
        getUserPersonalParameters(username: String): User 
        getAllClients: [User]
    }
    type Mutation {
    
        loginUser(input: UserInput): User
        
        createTrainingDays(input: UserInput): User
        createClient(input: UserInput): User
        
        eventWithParameterClient(input: UserInput): User
        
        updatePersonalClient(input: PersonalInput): User
        updateActiveClient(input: UserInput): User
        updateFeedClient(input: UserInput): User
        
    }
`)
module.exports = schema;
