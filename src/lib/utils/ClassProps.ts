export type ClassProp = string | Record<string, unknown> | Array<ClassProp> | null

export interface ClassProps {
  class?: ClassProp
}
