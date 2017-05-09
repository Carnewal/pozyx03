import pip from "point-in-polygon"

class Filter {

  reference
  type

  constructor(reference, type) {
    this.reference = reference
    this.type = type
  }

  execute(val, state) {
    this[this.type](val, state)
  }

  name(tag) {
    return this.reference === tag.name
  }

  inZone(tag, state) {
    const zone = state.zones.get(this.reference)
    return pip([tag.position.x, tag.position.y], zone.polygon)
  }

  outsideZone(tag, state) {
    return !this.inZone(tag, state)
  }

  label(tag) {
    return tag.labels.filter((label) => (label.labelName === this.reference)).length > 0
  }

  battery(tags) {
    return tags.filter((tag) => tag.battery >= this.reference[0] && tag.battery <= this.reference[1])
  }

  hardwareVersion(tag) {
    return tag.hardwareVersion === this.reference
  }

  firmwareVersion(tag) {
    return tag.firmwareVersion === this.reference
  }

}

export default Filter
