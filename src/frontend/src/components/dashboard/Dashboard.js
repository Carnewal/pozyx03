import React, {PropTypes} from 'react'
import UploadPlanArea from '../../containers/UploadPlanArea'
import Map from '../../containers/MapContainer'
import InfoBox from 'frontend/components/dashboard/InfoBox'
import PageBase from 'frontend/components/layout/PageBase'
import {Toolbar} from 'material-ui/Toolbar'

import {cyan600, purple600, green600} from 'material-ui/styles/colors'

import TagIcon from 'material-ui/svg-icons/maps/my-location'
import AnchorIcon from 'material-ui/svg-icons/action/perm-scan-wifi'
import ZoneIcon from 'material-ui/svg-icons/social/pages'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const updateDimensions = () => {
      this.setState({mapWidth: this.refs.mapSizePlaceholder.clientWidth})
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => {})
  }


  render() {
    const {floorPlan, tagsAmount, anchorsAmount, zonesAmount} = this.props
    return (
      <PageBase title='Dashboard'
        navigation='Map / Dashboard'
        >
        <br/>
      <div className='row'>

        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
          <InfoBox Icon={TagIcon}
                   color={purple600}
                   title='Tags'
                   value={tagsAmount}
          />
        </div>

        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
          <InfoBox Icon={AnchorIcon}
                   color={cyan600}
                   title='Anchors'
                   value={anchorsAmount}
          />
        </div>

        <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15'>
          <InfoBox Icon={ZoneIcon}
                   color={green600}
                   title='Zones'
                   value={zonesAmount}>
          </InfoBox>
        </div>

      </div>

      <br/>

      <Toolbar>
      </Toolbar>

      <div className='row'>

        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 '>
          <div ref='mapSizePlaceholder'></div>
          {(floorPlan && floorPlan !== '') ? <Map containerWidth={this.state && this.state.mapWidth}/> : <UploadPlanArea/>}
        </div>

      </div>

    </PageBase>


    )
  }
}

Dashboard.propTypes = {
  tagsAmount: PropTypes.number,
  anchorsAmount: PropTypes.number,
  zonesAmount: PropTypes.number,
  currentMap: PropTypes.number,
  floorPlan: PropTypes.string
}
