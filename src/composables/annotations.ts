import { Annotorious } from '@recogito/annotorious'

const translateAnnotationInfo = (value: string) => {
  const cleanValue = value.substr(11)
  const splitValues = cleanValue.split(',')
  return {
    left: parseInt(splitValues[0]),
    top: parseInt(splitValues[1]),
    width: parseInt(splitValues[2]),
    height: parseInt(splitValues[3]),
  }
}
