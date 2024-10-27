import * as api from '../api';

// Action Creators
export const getPatients = () =>  async (dispatch) => {
    try {
        const { data } = await api.fetchPatients();

        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message);
    }
}