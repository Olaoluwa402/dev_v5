import otpGenerator from "otp-generator"

export const uniqueCode =(num)=>{
    const code = otpGenerator.generate(num,{
        specialChars:true,
        upperCaseAlphabets:true
    })

    return`#${code}`
}