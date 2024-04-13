import axios from '../axios'
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user',
        data
    )
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', {id: userId})
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (inputType) => {
    return axios.get(`api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createSpecialty = (data) => {
    return axios.post('/api/create-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get('/api/get-specialty')
}

const deleteSpecialty = (specialtyId) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: specialtyId
        }
    });
}

const editSpecialty = (data) => {
    return axios.put('/api/edit-specialty', data)
}


const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createClinic = (data) => {
    return axios.post('/api/create-clinic', data)
}
const getAllClinic = () => {
    return axios.get('/api/get-clinic')
}

const deleteClinic = (clinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: clinicId
        }
    });
}

const editClinic = (data) => {
    return axios.put('/api/edit-clinic', data)
}


const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendDrugs = (data) => {
    return axios.post('/api/send-drugs', data)
}
const confirmBooking = (data) => {
    return axios.post('/api/doctor-confirm-booking', data)
}
const rejectBooking = (data) => {
    return axios.post('/api/doctor-reject-booking', data)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createSpecialty,
    getAllSpecialty, getAllDetailSpecialtyById,
    createClinic,
    getAllClinic, getAllDetailClinicById,
    getAllPatientForDoctor,
    postSendDrugs,
    confirmBooking, rejectBooking,
    deleteClinic, editClinic,
    deleteSpecialty, editSpecialty
}