import React from 'react'
import VPlayer, {PlayerProps} from "vnetwork-player";

import 'vnetwork-player/dist/vnetwork-player.min.css'

const Player:React.FC<PlayerProps> = (props) => {
  return <VPlayer {...props} />
}

export default Player