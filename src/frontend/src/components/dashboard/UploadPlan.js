import React from 'react'
import Dropzone from 'react-dropzone'

const styles = {
  width: '50%',
  margin: 'auto',
  height: 100,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
}

export default class UploadPlan extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
      <Dropzone
        multiple={false}
        accept='image/*'
        style={styles}
        onDrop={(e) => this.props.UploadFloorplan(e[0].preview)}>
        <p>Sleep een plattegrond naar hier of klik om een bestand up te loaden.</p>
      </Dropzone>
      </div>
    )
  }
}