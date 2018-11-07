const myQ = require('myq-api')
const Promise = require('es6-promise').Promise
require('dotenv').config()

const account = new myQ(process.env.USERNAME, process.env.PASSWORD)
console.log('env', process.env.USERNAME, process.env.PASSWORD)

const main = function() {
  let token = ''
  let activeGDO
  account.login()
      .then((res) => {
        console.log('Successfully logged in: ', res)
        token = res.token
      })
      .then(() => {
        console.log('token: ', token)
        account.getDevices(2)
            .then((res) => {
              console.log('Received list of devices: ', res)
              activeGDO = res.devices[0]
            })
            .then(() => {
              console.log('activegdo', activeGDO)
              // 1 opens door, 0 closes door
              account.setDoorState(activeGDO.id, 1)
                  .then((res) => {
                    console.log('Successfully opened door: ', activeGDO.id, activeGDO.name)
                  })
                  .then((res) => {
                      account.setDoorState(activeGDO.id, 0)
                          .then((res) => {
                            console.log('Successfully closed door: ', activeGDO.id, activeGDO.name)
                          })
                          .catch((err) => {
                            console.error('Error in closing dor: ', err)
                          })
                  })
                  .catch((err) => {
                    console.error('Error in opening door: ', err)
                  })
            })
            .catch((err) => {
              console.error('Error in receiving list of devices: ', err)
            })
      })
      .catch((err) => {
        console.error('Error in logging in: ', err)
      })
}

main()
