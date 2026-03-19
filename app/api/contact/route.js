export const runtime = "nodejs";
import nodemailer from "nodemailer"

export async function POST(req){

const {name,email,message} = await req.json()

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}
})

await transporter.sendMail({
from:email,
to:process.env.EMAIL_USER,
subject:"AirLink Ride Contact",
text:`
Name: ${name}
Email: ${email}
Message: ${message}
`
})

return Response.json({success:true})
}
