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

        this.socket.onmessage = async (msg) => {
          try {
            const datum = JSON.parse(await msg.data());
            this.receiveEvent(datum);
          } catch {}
        };
      }

      broadcastDatum(value, location, user){
        const datum = new DataPoint(value, location, user);
        this.socketsend(JSON.stringify(datum))
      }

      receiveEvent(datum) {
        this.data.push(datum);
    
        this.data.forEach((e) => {
          this.handlers.forEach((handler) => {
            handler(e);
          });
        });
      }
}


const Distributor = new DataDistributor();
export {DataPoint, DataDistributor};