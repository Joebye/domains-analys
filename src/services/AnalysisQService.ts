import config from 'config';
import amqp from 'amqplib'
import VTService from './VTService';
import WIService from './WIService';
import SeqDbService from './SeqDbService';

const url = config.get('rabbitMqConfig.rabbitMqUrl') as string;
const channelBind = config.get('rabbitMqConfig.channel') as string;
const vtServ = new VTService();
const wiServ = new WIService();
const seqDbServ = new SeqDbService();

export const rabbitMqSendToQ = async (msg: any) => {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel(); 
                channel.assertQueue(channelBind, {durable: true})
                channel.sendToQueue(channelBind, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
} 

export const rabbitMqConsumeAndHandle = async () => {
    try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel(); 
    await channel.assertQueue(channelBind, {durable: true});
    
channel.consume(channelBind, async(msg: any) => {
    if (msg) {
          const destMsg = msg.content.toString();
            try {
            const resScanVT = await vtServ.getScannedData(destMsg);
            const resScanWI = await wiServ.getUrlScan(destMsg);
            const [vt, wi] = await Promise.all([resScanVT, resScanWI]);
            const generalAnalysObj = {virusTotal: vt, whoIs: wi};
            await seqDbServ.analyzeDomainAndAddToResScansSeqDbFunc(generalAnalysObj);
            await seqDbServ.updateAnalizesList(destMsg);
            channel.ack(msg);
            console.log(" [x] received %s", destMsg);
            } catch (error) {
                console.error('Failed to handle messages:', error);
            }
    }
          }, {noAck: false});
        
} catch (error) {
        console.error('error in consumer', error);
    }
    
}




            
            
           