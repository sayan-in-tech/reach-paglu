import { create } from 'ipfs-core';

let ipfs;

// Initialize P2P network
export async function initP2P() {
  ipfs = await create({
    repo: 'reputation-extension',
    config: {
      Addresses: {
        Swarm: [
          '/dns6/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/'
        ]
      }
    }
  });

  // Subscribe to the reputation topic
  const topic = 'reputation-network';
  await ipfs.pubsub.subscribe(topic, (msg) => {
    const message = JSON.parse(new TextDecoder().decode(msg.data));
    onMessage(message);
  });

  // Broadcast messages to the network
  async function broadcast(message) {
    await ipfs.pubsub.publish(topic, new TextEncoder().encode(JSON.stringify(message)));
  }

  return { broadcast, onMessage: (callback) => (onMessage = callback) };
}