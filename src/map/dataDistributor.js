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
    listeners=[]
    
    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = () => {
        }

        this.socket.onmessage = async (msg) => {
          try {
            const datum = JSON.parse(await msg.data.text());
            let heatdatum = {
              location: datum.location,
              weight: datum.weight
          }
            this.data.push(heatdatum);
            this.notifyListeners();
            console.log('datadistributor updated to:', this.data);
          } catch (error){
            console.error(error)
          }
        };
      }

      
      addListener(callback) { 
        this.listeners.push(callback); 
      }
      
      removeListener(callback) { 
        this.listeners = this.listeners.filter(
          listener => listener !== callback
        ); 
      } 
       
      notifyListeners() { 
        console.log('sending new data', this.data)
        this.listeners.forEach(listener => listener(this.data));
      }

      broadcastDatum(datum){
        console.log('newdata', datum)
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