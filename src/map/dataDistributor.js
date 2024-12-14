class DataPoint {
    constructor(value, location, user){
        this.type = 'Y'
        this.value = value;
        this.location = location ;
        this.username = user;
    }
}
class DataDistributor {
    data=[]
    
    constructor() {
        console.log("constructing")
        let port = window.location.port;
        console.log(port)
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        console.log(protocol)
        console.log('thing',`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        console.log(this.socket)

        this.socket.onopen = () => {
            console.log('webSocket opened')
        }

        this.socket.onclose = () => {
            console.log("websocket closed")
        }

        this.socket.onerror = (error) => { console.error('WebSocket error', error); };

        this.socket.onmessage = async (msg) => {
          try {
            const datum = JSON.parse(await msg.data());
            this.data.push(datum);
          } catch {}
        };
      }

      broadcastDatum(datum){
        console.log("broadcasting")
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(datum))
            console.log('rocket')
        } else {
            console.log("sending")
            this.socket.addEventListener('open', () => {
                this.socket.send(JSON.stringify(datum))
                console.log("sent")
            })
        }
        
      }
    }

const Distributor = new DataDistributor();
console.log(Distributor)
export {DataPoint, Distributor};