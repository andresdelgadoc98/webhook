const { query } = require('../../Helpers/functions');
const moment = require('moment-timezone');

exports.sendVariables = async (req, res) => {

    const data = req.body
   
    try {
        const device_id = data.end_device_ids.device_id
        const device = await query (`SELECT Devices.DevicesName, Devices.DeviceType,DevicesUsers.DevicesUserID FROM DevicesUsers JOIN Devices ON DevicesUsers.DevicesTypeID = Devices.DevicesID WHERE DevicesUsers.DevicesIdTTN = ?;`,[device_id])
        const date = data.received_at
        const dateObj = new Date(date);
        console.log({dateObj})
        if(device.length > 0){
            if(device[0].DevicesName == 'Ambientales'){
                const decoded_payload = data.uplink_message.decoded_payload
                const Devices = await query (`SELECT * FROM Devices where PyhiscalDevice = 'Ambiental';`,[])
                const mexicoTime = moment(dateObj).tz("America/Mexico_City").format('YYYY-MM-DD HH:mm:ss');
    
                const dataBulk = []
    
                for (let i = 0; i < Devices.length; i++) {
                        dataBulk.push([Devices[i].DevicesID, decoded_payload[Devices[i].DevicesName],mexicoTime])
                 
                }
       
             const insert = await query (`INSERT INTO SensorReadings (SensorID,Value,Timestamp) values ?`,[dataBulk])
               
            }
    
        }
      
        res.status(200).json('')

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}