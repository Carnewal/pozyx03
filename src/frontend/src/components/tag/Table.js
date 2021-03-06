import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {grey500, grey200} from 'material-ui/styles/colors'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Slider from 'material-ui/Slider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'

import PageBase from 'frontend/components/layout/PageBase'
import Popout from 'frontend/containers/map/PopoutContainer'

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '10%'
    },
    name: {
      width: '20%'
    },
    labels: {
      width: '35%'
    },
    battery: {
      width: '20%'
    },
    edit: {
      width:'15%'
    }
  },
  chip: {
    margin: 4,
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  slider: {
    marginTop: 22,
    marginBottom: 0
  },
  batteryDropdown: {
    width: 118,
    marginTop: -14
  }
}

export default class TagTable extends React.Component {

render() {
  const {
    labels,
    labelFilters,
    searchFilter,
    batteryFilter,
    batteryOperator,
    onLabelClick,
    onSearchChange,
    onBatteryOperatorChange,
    onBatteryFilterChange
  } = this.props

  return (
    <PageBase title='Tags'
    navigation='Map / Tags'>

      <Popout />

      <br/>

      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 '>
          <TextField
          hintText='Filter by id, name or label'
          value={searchFilter}
          onChange={(e,val) => { onSearchChange(val) }}
          />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <div className='row'>
            <div className='col-xs-6 col-sm-9 col-md-8 col-lg-8 '>
              <Slider
                disabled={batteryOperator === 0}
                sliderStyle={styles.slider}
                defaultValue={0.5}
                value={batteryFilter}
                step={0.05}
                onChange={(e,val) => {onBatteryFilterChange(val)}}
              >
              <div>Test</div>
              </Slider>
            </div>
            <div className='col-xs-6 col-sm-3 col-md-4 col-lg-4 '>
              <SelectField
               value={batteryOperator}
               style={styles.batteryDropdown}
               autoWidth={false}
               onChange={(e,i,val) => {onBatteryOperatorChange(val)}}
               floatingLabelText='Battery filter'
              >
                <MenuItem value={0} primaryText='Off' />
                <MenuItem value={1} label={`> ${Math.round(batteryFilter*100)} %`} primaryText='More than' />
                <MenuItem value={2} label={`< ${Math.round(batteryFilter*100)} %`} primaryText='Less than' />
              </SelectField>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.chipWrapper}>
        {Object.keys(labels).map((lbl) =>
          <Chip
            style={styles.chip}
            key={lbl}
            onRequestDelete={labelFilters.includes(labels[lbl].name)
              ? () => { onLabelClick(labels[lbl].name) }
              : null
            }
            onTouchTap={() => {
              onLabelClick(labels[lbl].name)
            }}
            >
            {lbl}
          </Chip>
        )}
      </div>
      {this.props.tags.length > 0 ? <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.labels}>Labels</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.battery}>Battery</TableHeaderColumn>
    <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.tags.map(tag =>
      <TableRow key={tag.id}>
        <TableRowColumn style={styles.columns.id}>{tag.id}</TableRowColumn>
        <TableRowColumn style={styles.columns.name}>{tag.name}</TableRowColumn>
        <TableRowColumn style={styles.columns.labels}>
            <div style={styles.chipWrapper}>
              {tag.labels && tag.labels.map((l) => <Chip
                style={styles.chip}
                key={l.id}
                onRequestDelete={labelFilters.includes(l.name)
                  ? () => { this.props.onLabelClick(l.name) }
                  : null
                }
                onTouchTap={() => {
                  this.props.onLabelClick(l.name)
                }}
                >{l.name}</Chip>)}
            </div>
          </TableRowColumn>
        <TableRowColumn style={styles.columns.battery}>{tag.battery * 100}%</TableRowColumn>
        <TableRowColumn style={styles.columns.edit}>
          <Link className='button' to={`tag/${tag.id}`}>
            <FloatingActionButton zDepth={0}
                                  mini={true}
                                  backgroundColor={grey200}
                                  iconStyle={styles.editButton}>
              <ContentCreate  />
            </FloatingActionButton>
          </Link>
        </TableRowColumn>
      </TableRow>
    )}
    </TableBody>
    </Table> : <div><br/>No tags found!</div>}
    </PageBase>
  )

}
}

TagTable.propTypes = {
  tags: PropTypes.array,
  labels: PropTypes.object,
  labelFilters: PropTypes.array,
  searchFilter: PropTypes.string,
  batteryFilter: PropTypes.number,
  batteryOperator: PropTypes.number,
  onLabelClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onBatteryFilterChange: PropTypes.func,
  onBatteryOperatorChange: PropTypes.func
}

TagTable.defaultProps = {
  tags: [],
  labels: {},
  labelFilters: [],
  batteryFilter: null,
  onLabelClick: (id) => {console.log('unhandled click ' + id)},
  onSearchChange: (val) => {console.log('unhandled search change ' + val)},
  onBatteryOperatorChange: (val) => {console.log('unhandled battery operator change ' + val)},
  onBatteryFilterChange: (val) => {console.log('unhandled battery slider change ' + val)}
}
