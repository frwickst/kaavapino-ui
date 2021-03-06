import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { saveProject } from '../../actions/projectActions'
import { fetchSchemas } from '../../actions/schemaActions'
import { savingSelector } from '../../selectors/projectSelector'
import { schemaSelector } from '../../selectors/schemaSelector'
import EditForm from './EditForm'

class ProjectEditPage extends Component {
  componentDidMount() {
    const { project } = this.props
    this.props.fetchSchemas(project.type)
  }

  render() {
    const { schema, phase, saveProject, project: { attribute_data }, saving } = this.props
    if (!schema) {
      return <Loader inline={'centered'} active>Ladataan</Loader>
    }
    const currentSchema = schema.phases[phase - 1]
    return (
      <EditForm
        handleSave={saveProject}
        sections={currentSchema.sections}
        attributeData={attribute_data}
        saving={saving}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schema: schemaSelector(state),
    saving: savingSelector(state)
  }
}

const mapDispatchToProps = {
  fetchSchemas,
  saveProject
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEditPage)
