class DataPoint {
    constructor(value, location, user){
        this.type = 'Y'
        this.weight = value;
        this.location = location ;
        this.username = user;
    }
}
class DataDistributor {
    data=[]
    
    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = () => {
        }

        this.socket.onmessage = async (msg) => {
          try {
            console.log('gotdata')
            const datum = JSON.parse(await msg.data.text());
            console.log(datum)
            let heatdatum = {
              location: datum.location,
              weight: datum.weight
          }
            this.data.push(heatdatum);
            console.log(heatdatum)
            console.log(this.data)
          } catch (error){
            console.error(error)
          }
        };
      }

      broadcastDatum(datum){
        console.log('newdata')
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(datum))
        } else {
            this.socket.addEventListener('open', () => {
                this.socket.send(JSON.stringify(datum))
            })
        }
      }
    }

const Distributor = new DataDistributor();
export {DataPoint, Distributor};