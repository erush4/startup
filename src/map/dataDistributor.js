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
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = () => {
        }

        this.socket.onmessage = async (msg) => {
          try {
            const datum = JSON.parse(await msg.data());
            this.data.push(datum);
          } catch {}
        };
      }

      broadcastDatum(datum){
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