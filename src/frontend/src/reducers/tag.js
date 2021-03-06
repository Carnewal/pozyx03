import { SHOW_POSITIONS, SET_TAGS, ADD_LABEL, REMOVE_LABEL } from 'frontend/actions/TagActions'

const initialState = []

const tag = (state = initialState, action) => {
  switch(action.type) {
    case SET_TAGS: {
      return [...action.tags]
    }
    case SHOW_POSITIONS: {
      const newState = state.slice()
      const positions = action.positions
      newState.map((tag) => {
        const index = positions.findIndex((position) => position.id === tag.id)
        if(positions[index]) {
          delete positions[index].id
          tag.position = positions[index]
        }
      })
      return newState
    }
    case ADD_LABEL: {
      console.log('add label', label)
      const {tagId, label} = action
      const newState = state.slice()
      const tagIndex = newState.findIndex((tag) => tag.id === tagId)
      if(newState[tagIndex].labels && newState[tagIndex].labels.length) {
        newState[tagIndex].labels.push(label)
      } else {
        newState[tagIndex].labels = [label]
      }
      return newState
    }
    case REMOVE_LABEL: {
      const {tagId, labelId} = action
      console.log(tagId, labelId)

      const newState = state.slice()
      const tagIndex = newState.findIndex((tag) => tag.id === tagId)
      newState[tagIndex].labels = newState[tagIndex].labels.filter((label) => label.id !== labelId)
      return newState
    }
    default:
      return state
  }
}

export default tag
