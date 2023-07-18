exports.sendVariables = async (req, res) => {
    const data = req.body
    const date = data.date
    const variables = data.data
    const wellName = data.WellId.replace("\r", "")
    let wellid = 0
    let bulkData = []
    try {

        let SELECT = await query('select * from wells where name = ?', [wellName]);
        console.log({SELECT})
        if(SELECT.length > 0){
            wellid = SELECT[0].id_wells
        }else{
            let INSERT_Well = await query('INSERT INTO wells (name) VALUES (?)', [wellName]);
            let SELECT = await query('select * from wells where name = ?', [wellName]);
            wellid = SELECT[0].id_wells
        }
        

        for (let i = 0; i < variables.length; i++) {
            const element = variables[i];
            bulkData.push([element.id,parseFloat(element.value.replace("\r", "")),parseInt(wellid),date])
        }    
        let insert = await query('INSERT INTO variables (code,value,wellId,date) VALUES ?', [bulkData]);
        res.status(200).json('')

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}