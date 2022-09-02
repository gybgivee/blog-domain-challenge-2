const { Prisma } = require("@prisma/client")

const getErrorCode = (e, model="field") => {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        
        if (e.code === "P2002") {
            return { status: 409, data: { error: `A ${model} with the provided email already exists`}}
        } 
        else if (e.code === "P2025") {
            return { status: 404, data: { error: `A ${model}  with the provided id does not exists!` }}
        }

    }
    console.log(e.message);
    return { status: 500, data: { error:`Internal Error ${e.code}`}}

}

module.exports = {
    getErrorCode
}