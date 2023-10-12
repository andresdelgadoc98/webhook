const { query } = require('../../Helpers/functions');

exports.sendVariables = async (req, res) => {
    const data = JSON.parse(req.body.data)
    try {
        const device_id = data.identifiers[0].device_ids.device_id
        const device = await query (`SELECT Devices.DevicesName, Devices.DeviceType,DevicesUsers.DevicesUserID FROM DevicesUsers JOIN Devices ON DevicesUsers.DevicesTypeID = Devices.DevicesID WHERE DevicesUsers.DevicesIdTTN = ?;`,[device_id])
        const date = data.time
        const dateObj = new Date(date);

        if(device[0].DevicesName == 'Ambientales'){
            const decoded_payload = data.data.uplink_message.decoded_payload
       
            const dataBulk = []

            for (let i = 0; i < Devices.length; i++) {
                    dataBulk.push([Devices[i].DevicesID, decoded_payload[Devices[i].DevicesName],dateObj.toISOString().slice(0, 19).replace('T', ' ')])
             
            }
   
         const insert = await query (`INSERT INTO SensorReadings (SensorID,Value,Timestamp) values ?`,[dataBulk])
           
        }

        res.status(200).json('')

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}