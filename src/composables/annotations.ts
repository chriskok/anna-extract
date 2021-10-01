// @ts-ignore (annotorious lib is not typed)
import { Annotorious } from '@recogito/annotorious'
import {
  Annotation,
  AnnotationSelection,
  FormattedAnnotation,
} from '~/types/customTypes'
import '@recogito/annotorious/dist/annotorious.min.css'

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

const anno = ref()
const selectedAnnotationId = ref('')
const annotations = ref<FormattedAnnotation[]>([])

export const useAnnotations = () => {
  return {
    anno,
    selectedAnnotationId,
    annotations,
    initAnnotations: (imageRef: HTMLImageElement) => {
      // Creates a new annotorious instance on headless mode
      anno.value = new Annotorious({
        image: imageRef,
        disableEditor: true,
      })
      anno.value.on(
        'createSelection',
        async (selection: AnnotationSelection) => {
          // This saves the created selection, triggering the createAnnotation event
          await anno.value.updateSelected(selection, true)
        }
      )
      anno.value.on('cancelSelected', (selection: Selection) => {
        selectedAnnotationId.value = ''
      })
      anno.value.on(
        'updateAnnotation',
        (newAnnotation: Annotation, prevAnnotation: Annotation) => {
          annotations.value.forEach((ann, i) => {
            if (prevAnnotation.id === ann.id) {
              annotations.value[i] = {
                ...annotations.value[i],
                ...translateAnnotationInfo(newAnnotation.target.selector.value),
              }
            }
          })
        }
      )
      anno.value.on('createAnnotation', (annotation: Annotation) => {
        annotations.value.push({
          name: '',
          id: annotation.id,
          ...translateAnnotationInfo(annotation.target.selector.value),
          new: true,
        })
        anno.value.selectAnnotation(annotation.id)
        selectedAnnotationId.value = annotation.id
      })
      anno.value.on('selectAnnotation', (annotation: Annotation) => {
        selectedAnnotationId.value = annotation.id
      })
    },
    cancelSelection: () => {
      anno.value.cancelSelected()
    },
    removeAnnotation: (annotationId: string) => {
      const deletedIndex = annotations.value.findIndex(
        (annotation) => annotation.id === annotationId
      )
      anno.value.removeAnnotation(annotationId)
      selectedAnnotationId.value = ''
      annotations.value.splice(deletedIndex, 1)
      anno.value.cancelSelected()
    },
  }
}
