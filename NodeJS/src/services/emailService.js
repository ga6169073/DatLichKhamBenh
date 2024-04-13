require("dotenv").config()
import nodemailer from "nodemailer"

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })
    await transporter.sendMail({
        from: '"BookingforHealth" <ga6169076@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "-----------------", // plain text body
        html: getBodyHTML(dataSend), // html body
    })
}

let getBodyHTML = (dataSend) => {
    let result = ""
        result = `
        <h3 >Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingforHealth</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div ><b>Thời gian: ${dataSend.time}<b/></div>
        <div ><b>Bác sĩ: ${dataSend.doctorName}<b/></div>
        
        <p>Nếu đúng là bạn, hãy click đường link bên dưới để hoàn tất việc đặt lịch</p>
        <div><a href=${dataSend.redirectLink}>Bấm vào đây</a></div>
        <div> Xin trân thành cảm ơn ! </div>
        `
    

    return result
}
let sendAttachments = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            })
            await transporter.sendMail({
                from: '"BookingforHealth" <ga6169076@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                text: "-----------------", // plain text body
                html: getBodyHTMLDrugsList(dataSend),
                attachments: [
                    {
                        filename: `drugsList-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64")[1],
                        encoding: 'base64'

                    }
                ]
            })
            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}
let getBodyHTMLDrugsList = (dataSend) => {
    let result = ""
    
        result = `
        <h3 >Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingforHealth</p>
        <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm : </p>
      
        <div> Xin chân thành cảm ơn ! </div>
        `
    

    return result
}

let sendDoctorConfirmEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })
    await transporter.sendMail({
        from: '"BookingforHealth" <ga6169076@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Bác sĩ đã xác nhận lịch khám bệnh", // Subject line
        text: "-----------------", // plain text body
        html: getBodyConfirmHTML(dataSend), // html body
    })
}
let getBodyConfirmHTML = (dataSend) => {
    let result = ""
        result = `
        <h3 >Xin chào ${dataSend.patientName}!</h3>
        <p><b>Bác sĩ đã xác nhận lịch khám bệnh của bạn</b></p>
        <p>Thông tin lịch khám bệnh được xác nhận: </p>
        <div ><b>Thời gian: ${dataSend.time}<b/></div>
        <div ><b>Bác sĩ: ${dataSend.doctorName}<b/></div>
        
        <div> Vui lòng đến đúng khung giờ đã hẹn </div>
        <div> Xin chân thành cảm ơn ! </div>
        `
    

    return result
}
let sendDoctorRejectEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })
    await transporter.sendMail({
        from: '"BookingforHealth" <ga6169076@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Bác sĩ từ chối lịch khám bệnh", // Subject line
        text: "-----------------", // plain text body
        html: getBodyRejectHTML(dataSend), // html body
    })
}
let getBodyRejectHTML = (dataSend) => {
    let result = ""
    console.log(dataSend)
        result = `
        <h3 >Xin chào ${dataSend.patientName}!</h3>
        <p><b>Bác sĩ đã từ chối lịch khám bệnh của bạn</b></p>
        <p>Thông tin lịch khám bệnh đã bị từ chối: </p>
        <div ><b>Thời gian: ${dataSend.time}<b/></div>
        <div ><b>Bác sĩ: ${dataSend.doctorName}<b/></div>
        
        <div><b> Lý do: ${dataSend.reason}<b/></div>

        <div> Xin chân thành cảm ơn ! </div>
        `
    

    return result
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachments: sendAttachments,
    sendDoctorConfirmEmail: sendDoctorConfirmEmail,
    sendDoctorRejectEmail: sendDoctorRejectEmail
} 