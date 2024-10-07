type EmptyObject = {
  [K in string | number | symbol]: never
}

export default EmptyObject
