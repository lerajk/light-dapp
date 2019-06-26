import React from 'react'
import light, { myBalance$, syncStatus$ }from '@parity/light.js'
import _light from '@parity/light.js-react'


@_light({
  // myBalance: myBalance$, // myBalance will be a BigNumber
  // mySyncVariable: syncStatus$
  // mySyncVariable: 'online'
})
class Parity extends React.Component {
  render() {
    return (
      <div>
        Here!
        {/* My balance is {this.props.myBalance.toFormat()}.<br /> */}
        {/* The sync status is {JSON.stringify(this.props.mySyncVariable)}. */}
      </div>
    );
  }
}

export default Parity