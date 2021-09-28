export const newTemplateStep = ref(0)
export const useTemplates = () => {
  const newTemplateImage = ref()
  const newTemplateFile = ref()
  const newTemplateScale = ref(0)
  return {
    steps: [{ name: 'Upload sample document' }, { name: 'Manage labels' }],
    newTemplateImage: newTemplateImage,
    newTemplateFile: newTemplateFile,
    setNewTemplate: (files: FileList) => {
      newTemplateFile.value = files[0]
      newTemplateImage.value = URL.createObjectURL(files[0])
      // const temp = new Image()
      // temp.src = newTemplateImage.value
      // temp.onload = () => {
      //   newTemplateScale.value =
      // }
    },
  }
}
