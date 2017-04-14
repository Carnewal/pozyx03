import { connect } from 'react-redux'
import Map from 'frontend/components/dashboard/Map'
import { getFloorPlan } from 'frontend/selectors/map'
import { getFilteredTags } from 'frontend/selectors/tag'
import { getAnchors } from 'frontend/selectors/anchor'

const mapStateToProps = (state) => ({
  positions: getFilteredTags(state).map((tag) => ({
    tagId:tag.id,
    x: tag.position.x,
    y:tag.position.y,
    z: tag.position.z
  })),
  floorPlan: getFloorPlan(state),
  anchors: getAnchors(state).map((anchor) => ({
    anchorId: anchor.id,
    x: anchor.position.x,
    y: anchor.position.y,
    z: anchor.position.z
  }))
})

export default connect(
  mapStateToProps
)(Map)
