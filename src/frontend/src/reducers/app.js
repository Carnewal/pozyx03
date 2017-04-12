import { SET_CURRENTMAP } from 'frontend/actions/MapActions'
import {
  TOGGLE_TAG_LABEL_FILTER,
  SET_TAG_SEARCH,
  SET_TAG_BATTERY_FILTER,
  SET_TAG_BATTERY_OPERATOR,
  SET_NAVDRAWER_OPEN,
  ADD_ALERT,
  REMOVE_ALERT
} from 'frontend/actions/AppActions'
import { ERROR, WARNING, SUCCESS } from 'frontend/constants/priorities'
import { getCurrentAlertIndex } from 'frontend/selectors/app'

const initialState = {
  currentMap: 4,
  alerts: [],
  navDrawerOpen: true
}

const sortFunction = (a1, a2) => {
  const diff = priorityNumber(a1.priority) - priorityNumber(a2.priority)
    console.log(a1, a2,diff, a1.id-a2.id,priorityNumber(a1.priority),priorityNumber(a2.priority))
  if (diff == 0) {
    return a1.id - a2.id
  }
  return diff
}

const priorityNumber = (priority) => {
  switch(priority) {
    case ERROR: {
      return 0
    }
    case SUCCESS: {
      return 1
    }
    case WARNING: {
      return 2
    }
    default: {
      return 3
    }
  }
}

const app = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENTMAP: {
      return Object.assign({}, initialState, { currentMap: action.mapId })
    }
    case TOGGLE_TAG_LABEL_FILTER: {
      const labelSet = new Set(state.tagLabelFilters || [])
      return Object.assign({}, state, {
        tagLabelFilters: [
          ...(labelSet.delete(action.labelId)
            ? labelSet
            : labelSet.add(action.labelId)
          )
        ]
      })
    }
    case SET_TAG_BATTERY_FILTER: {
      return Object.assign({}, state, { tagBatteryFilter: action.percentage })
    }
    case SET_TAG_BATTERY_OPERATOR: {
      return Object.assign({}, state, { tagBatteryOperator: action.operator })

    }
    case SET_TAG_SEARCH: {
      return Object.assign({}, state, { tagSearch: action.search })
    }
    case ADD_ALERT: {
      let newState = Object.assign({}, state)
      newState.alerts.push({id: Date.now(), message: action.message, duration: action.duration, priority: action.priority})
      newState.alerts = newState.alerts.slice(0,1).concat(newState.alerts.slice(1,newState.alerts.length).sort(sortFunction))
      return newState
    }
    case REMOVE_ALERT: {
      let newState = Object.assign({}, state)
      delete newState.alerts.splice(0, 1)
      return newState
    }
    case SET_NAVDRAWER_OPEN: {
      return Object.assign({}, state, { navDrawerOpen: action.navDrawerOpen})
    }
    default:
      return state
  }
}

export default app
