export default reducer = (patients = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return patients;
        default:
            return patients;
    }
}