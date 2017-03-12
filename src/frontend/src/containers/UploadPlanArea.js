import { connect } from 'react-redux'
import { setFloorplan } from '../actions/FloorPlanActions'
import UploadPlan from '../components/dashboard/UploadPlan'

const mapDispatchToProps = (dispatch) => ({
  UploadFloorplan: (file) =>  { dispatch(setFloorplan(file)) }
})

export default connect(
  null,
  mapDispatchToProps
)(UploadPlan)
