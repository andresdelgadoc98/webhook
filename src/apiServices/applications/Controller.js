exports.sendVariables = async (req, res) => {
    const data = req.body

    try {
        console.log( data )
        console.log("##########################################")
        res.status(200).json('')

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}