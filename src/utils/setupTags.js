const setupTags = tags => {
  // Sort tags alphabetically
  const newTags = tags.sort((a, b) => a.tag.localeCompare(b.tag))
  return newTags
}

export default setupTags
