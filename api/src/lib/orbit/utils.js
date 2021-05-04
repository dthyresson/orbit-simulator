import camelcase from 'camelcase'
import {
  formatISO9075,
  parseJSON,
  startOfToday,
  subDays,
  endOfTomorrow,
} from 'date-fns'

const camelizeModelKeys = ({ model }) => {
  Object.entries(model).forEach((entry) => {
    const [key, value] = entry
    if (key.indexOf('_') > 0) {
      model[camelcase(key)] = value
      delete model[key]
    }
  })

  return model
}

const delistify = ({ model, attributes = [] }) => {
  attributes.forEach((attribute) => {
    try {
      model[attribute] =
        model[attribute] === null ? undefined : model[attribute]
    } catch {
      console.warn('Could not delistify')
    }
  })

  return model
}

const dateify = ({ model }) => {
  Object.entries(model).forEach((entry) => {
    const [key, value] = entry
    if (key.endsWith('_at') || key.endsWith('At') || key === 'birthday') {
      try {
        model[camelcase(key)] = value !== null ? parseJSON(value) : null
      } catch {
        model[camelcase(key)] = null
        console.warn(`Cound not convert ${key} value of ${value} to a datetime`)
      }
    }
  })

  return model
}

const deorbitize = ({ config, model }) => {
  try {
    model.orbitId = Number(model.id)
    delete model.id
    model.orbitSyncAt = new Date()
    model.orbitUpdatedAt = model.updatedAt
  } catch {
    model.orbitId = model.id
    model.orbitSyncAt = new Date()
    model.orbitUpdatedAt = model.updatedAt
    console.warn('Missing id')
  }

  model = camelizeModelKeys({ model })

  if (
    config?.parserConfig?.listAttributes &&
    config?.parserConfig?.listAttributes.length > 0
  ) {
    model = delistify({
      model,
      attributes: config.parserConfig.listAttributes,
    })
  }

  return model
}

const recentSearchParams = (daysAgo = 1) => {
  return {
    start_date: formatISO9075(subDays(startOfToday(), daysAgo), {
      representation: 'date',
    }),
    end_date: formatISO9075(endOfTomorrow(), { representation: 'date' }),
  }
}

export { dateify, deorbitize, recentSearchParams }
